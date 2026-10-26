
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLoanDto } from './dto/create-loan.dto.js';

@Injectable()
export class LoansService {
  constructor(private readonly prisma: PrismaService) {}

  async registrarPrestamo(dto: CreateLoanDto) {
    const {
      employeeId,
      destination,
      unitIds,
      materials,
    } = dto;
console.log('Datosss recibidos:', dto.employeeId);
    // 1. Validar los datos recibidos
    if (!unitIds || unitIds.length === 0) {
      throw new BadRequestException(
        'Debes seleccionar al menos una herramienta.',
      );
    }

    // Evitar repetir unidades físicas
    if (new Set(unitIds).size !== unitIds.length) {
      throw new BadRequestException(
        'No puedes seleccionar la misma herramienta más de una vez.',
      );
    }
      
    // Evitar repetir materiales
    if (
      new Set(materials.map((item) => item.materialId)).size !==
      materials.length
    ) {
      throw new BadRequestException(
        'No puedes repetir un material en el préstamo.',
      );
    }

    // 2. Verificar que exista el empleado
    const employee = await this.prisma.employee.findUnique({
      where: {
        employeeID: employeeId,
      },
    });
    console.log('Datos recibidos:', dto);
console.log('employeeId:', dto.employeeId);

    if (!employee) {
      throw new NotFoundException('El empleado no existe.');
    }

    // 3. Ejecutar todas las operaciones en una transacción
    return this.prisma.$transaction(async (tx) => {
      // Reservar solamente las herramientas disponibles
      const updatedUnits = await tx.toolUnit.updateMany({
        where: {
          unitId: {
            in: unitIds,
          },
          status: 'Disponible',
        },
        data: {
          status: 'Prestado',
        },
      });

      // Todas las unidades solicitadas deben estar disponibles
      if (updatedUnits.count !== unitIds.length) {
        throw new ConflictException(
          'Una o más herramientas no están disponibles.',
        );
      }

      // 4. Descontar los materiales del inventario
      for (const item of materials) {
        if (
          !Number.isInteger(item.quantity) ||
          item.quantity <= 0
        ) {
          throw new BadRequestException(
            'La cantidad de cada material debe ser un entero positivo.',
          );
        }

        const updatedMaterial = await tx.material.updateMany({
          where: {
            materialID: item.materialId,
            quantity: {
              gte: item.quantity,
            },
          },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });

        if (updatedMaterial.count !== 1) {
          throw new BadRequestException(
            `El material ${item.materialId} no existe o no tiene stock suficiente.`,
          );
        }
      }

      // 5. Crear el préstamo
      const loan = await tx.loan.create({
        data: {
          employeeId,
          destination,
          status: 'Entregado',
        },
      });

      // 6. Asociar las unidades físicas al préstamo
      await tx.loanTool.createMany({
        data: unitIds.map((unitId) => ({
          loanId: loan.loanId,
          unitId,
        })),
      });

      // 7. Registrar los materiales y sus cantidades
      if (materials.length > 0) {
        await tx.loanMaterial.createMany({
          data: materials.map((item) => ({
            loanId: loan.loanId,
            materialId: item.materialId,
            quantity: item.quantity,
          })),
        });
      }

      // 8. Devolver la respuesta
      return {
        loanId: loan.loanId,
        mensaje: 'Préstamo registrado correctamente.',
      };
    });
  }
}
