import { Test, TestingModule } from '@nestjs/testing';
import { NatsCommunicatorService } from './nats-communicator.service';

describe('NatsCommunicatorService', () => {
  let service: NatsCommunicatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NatsCommunicatorService],
    }).compile();

    service = module.get<NatsCommunicatorService>(NatsCommunicatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
