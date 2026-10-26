import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { EmployeesModule } from './employees/employees.module.js';
import { ToolsModule } from './tools/tools.module.js';
import { MaterialsModule } from './materials/materials.module.js';
import { LoansModule } from './loans/loans.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EmployeesModule,
    ToolsModule,
    MaterialsModule,
    LoansModule,
  ],
})
export class AppModule {}