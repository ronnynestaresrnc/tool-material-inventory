import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoansService } from './loans.service.js';
import { CreateLoanDto } from './dto/create-loan.dto.js';
import { UpdateLoanDto } from './dto/update-loan.dto.js';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    console.log('Datos recibidos en el controladsor:', createLoanDto);
    return this.loansService.registrarPrestamo(createLoanDto);
  }

  @Get()
  findAll() {
    return "s";
  }

 


}
