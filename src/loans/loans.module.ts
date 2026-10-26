import { Module } from '@nestjs/common';
import { LoansService } from './loans.service.js';
import { LoansController } from './loans.controller.js';

@Module({
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
