import { Test, TestingModule } from '@nestjs/testing';
import { SondeController } from './sonde.controller';

describe('SondeController', () => {
  let controller: SondeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SondeController],
    }).compile();

    controller = module.get<SondeController>(SondeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
