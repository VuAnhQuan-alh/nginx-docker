import { Test, TestingModule } from '@nestjs/testing';
import { SuperController } from './super.controller';
import { SuperService } from './super.service';

describe('SuperController', () => {
  let controller: SuperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperController],
      providers: [SuperService],
    }).compile();

    controller = module.get<SuperController>(SuperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
