
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateToolDto} from './dto/create-tool.dto.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class ToolsService {
  constructor(private readonly prisma: PrismaService) {}
async findAll() {
    return this.prisma.tool.findMany()
  }




  async register(dto: CreateToolDto) {
    const name = dto.name.trim();
    const serialCode = dto.serialCode.trim();

    if (!name || !serialCode) {
      throw new BadRequestException(
        'El nombre y el código interno son obligatorios',
      );
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        let tool = await tx.tool.findUnique({
          where: { name },
        });

        if (!tool) {
          tool = await tx.tool.create({
            data: { name },
          });
        }

        const unit = await tx.toolUnit.create({
          data: {
            toolId: tool.toolID,
            serialCode,
            status: 'Disponible',
          },
        });

        return {
          message: 'Herramienta registrada correctamente',
          tool,
          unit,
        };
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'El código interno ya está registrado o el tipo de herramienta está duplicado',
        );
      }

      throw error;
    }
  }


}
