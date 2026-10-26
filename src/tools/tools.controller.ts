import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToolsService } from './tools.service.js';
import { CreateToolDto } from './dto/create-tool.dto.js';
import { UpdateToolDto } from './dto/update-tool.dto.js';
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

 @Post('registrations')
  create(@Body() createToolDto: CreateToolDto) {
      console.log('Datos recibidos:', createToolDto);

    return this.toolsService.register(createToolDto);
  }

  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

 

  

  
}
