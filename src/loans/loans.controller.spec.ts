import { Test, TestingModule } from '@nestjs/testing';
import { LoansController } from './loans.controller.js';
import { LoansService } from './loans.service.js';

describe('LoansController', () => {
  let controller: LoansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [LoansService],
    }).compile();

    controller = module.get<LoansController>(LoansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
