import { Test, TestingModule } from '@nestjs/testing';
import { LgpdService } from './lgpd.service';

describe('LgpdService', () => {
  let provider: LgpdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LgpdService],
    }).compile();

    provider = module.get<LgpdService>(LgpdService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
