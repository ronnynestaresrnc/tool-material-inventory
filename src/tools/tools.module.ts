import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service.js';
import { ToolsController } from './tools.controller.js';

@Module({
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
