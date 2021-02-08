import { Test, TestingModule } from '@nestjs/testing';
import { LgpdController } from './lgpd.controller';

describe('LgpdController', () => {
  let controller: LgpdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LgpdController],
    }).compile();

    controller = module.get<LgpdController>(LgpdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
