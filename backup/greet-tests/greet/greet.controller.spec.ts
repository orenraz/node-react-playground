import { Test, TestingModule } from '@nestjs/testing';
import { GreetController } from '../../../src/modules/greet/greet.controller';
import { GreetService } from '../../../src/modules/greet/greet.service';
import { CreateGreetDto } from '../../../src/modules/greet/dto/create-greet.dto';
import { UpdateGreetDto } from '../../../src/modules/greet/dto/update-greet.dto';

describe('GreetController', () => {
  let controller: GreetController;
  let service: GreetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreetController],
      providers: [
        {
          provide: GreetService,
          useValue: {
            createGreeting: jest.fn().mockReturnValue({ id: '1', name: 'Test', message: 'Hello, Test!' }),
            findAllGreetings: jest.fn().mockReturnValue([]),
            findGreetingById: jest.fn().mockReturnValue({ id: '1', name: 'Test', message: 'Hello, Test!' }),
            updateGreeting: jest.fn().mockReturnValue({ id: '1', name: 'Updated', message: 'Hello, Updated!' }),
            deleteGreeting: jest.fn().mockReturnValue({ id: '1', name: 'Test', message: 'Hello, Test!' }),
          },
        },
      ],
    }).compile();

    controller = module.get<GreetController>(GreetController);
    service = module.get<GreetService>(GreetService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a greeting', () => {
      const dto: CreateGreetDto = { name: 'Test', message: 'Hello, Test!' };
      expect(controller.create(dto)).toEqual({ id: '1', name: 'Test', message: 'Hello, Test!' });
      expect(service.createGreeting).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all greetings', () => {
      expect(controller.findAll()).toEqual([]);
      expect(service.findAllGreetings).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single greeting', async () => {
      await expect(controller.findOne('1')).resolves.toEqual({ id: '1', name: 'Test', message: 'Hello, Test!' });
      expect(service.findGreetingById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a greeting', async () => {
      const dto: UpdateGreetDto = { message: 'Updated Message' };
      const result = await controller.update('1', dto);
      expect(result).toEqual({ id: '1', name: 'Test', message: 'Updated Message' });
      expect(service.updateGreeting).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should delete a greeting', () => {
      expect(controller.remove('1')).toEqual({ id: '1', name: 'Test', message: 'Hello, Test!' });
      expect(service.deleteGreeting).toHaveBeenCalledWith('1');
    });
  });
});