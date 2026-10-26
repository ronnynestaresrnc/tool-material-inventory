import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { UpdateMaterialDto } from './dto/update-material.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class MaterialsService {
    constructor(private readonly prisma: PrismaService) {}

  create(createMaterialDto: CreateMaterialDto) {
    return 'This action adds a new material';
  }

  findAll() {
    return this.prisma.material.findMany();
  }

  findOne(id: number) {
    return this.prisma.material.findUnique({
      where: { materialID:id },
    });
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`;
  }

  remove(id: number) {
    return `This action removes a #${id} material`;
  }
}
