
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  // Consultar todos los empleados
  findAll() {
    return this.prisma.employee.findMany();
  }

  // Consultar un empleado por su ID
  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { employeeID: id },
    });

    if (!employee) {
      throw new NotFoundException(
        `No existe el empleado con ID ${id}`,
      );
    }

    return employee;
  }
}
