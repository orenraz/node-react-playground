import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/modules/user/user.controller';
import { UserService } from '../../../src/modules/user/user.service';
import { CreateUserDto } from '../../../src/modules/user/dto/create-user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              userId: '123',
              firstName: 'John',
              lastName: 'Doe',
              gender: 'male',
            }),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      userId: '123',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      age: 30,
    };

    const result = await userController.create(createUserDto);

    expect(result).toEqual({
      userId: '123',
      firstName: 'John',
      lastName: 'Doe',
      gender: 'male',
      age: 30,
    });
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
  });
});