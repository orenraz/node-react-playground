import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '../../../src/modules/user/user.service';
import { User } from '../../../src/modules/database/schemas/user.schema';

const mockUserModel = jest.fn().mockImplementation(() => ({
  save: jest.fn().mockResolvedValue({
    userId: 'test123',
    firstName: 'Test',
    lastName: 'User',
    gender: 'Other',
    age: 30,
    toObject: jest.fn().mockReturnValue({
      userId: 'test123',
      firstName: 'Test',
      lastName: 'User',
      gender: 'Other',
      age: 30,
    }),
  }),
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        userId: 'test123',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Other',
        age: 30,
      };
      const result = await service.create(createUserDto);
      expect(mockUserModel).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createUserDto);
    });
  });
});