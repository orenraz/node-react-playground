import { UserService } from '@src/modules/user/user.service';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { CreateUserDto } from '@src/modules/user/dto/create-user.dto';
import { BaseUnitTest } from '@test/unit/common/BaseUnitTest';

jest.mock('@src/modules/user/repositories/user.repository');

const mockUser: any = {
  userId: 'u1',
  firstName: 'John',
  lastName: 'Doe',
  gender: 'male',
  age: 30,
};

class UserServiceUnitTest extends BaseUnitTest {
  service!: UserService;
  repo!: jest.Mocked<UserRepository>;

  async beforeEach() {
    await super.beforeEach();
    // Provide a mock for the userModel argument
    this.repo = new UserRepository({} as any) as jest.Mocked<UserRepository>;
    this.service = new UserService(this.repo);
  }
}

describe('UserService', () => {
  const test = new UserServiceUnitTest();

  beforeAll(async () => {
    await test.beforeAll();
  });

  afterAll(async () => {
    await test.afterAll();
  });

  afterEach(() => {
    test.afterEach();
  });

  beforeEach(async () => {
    await test.beforeEach();
  });

  it('should create a user', async () => {
    test.repo.create.mockResolvedValueOnce(mockUser);
    const dto = { ...mockUser } as CreateUserDto;
    const result = await test.service.create(dto);
    expect(result).toEqual(mockUser);
  });

  it('should handle duplicate userId error', async () => {
    test.repo.create.mockRejectedValueOnce({ code: 11000 });
    const dto = { ...mockUser } as CreateUserDto;
    await expect(test.service.create(dto)).rejects.toThrow('Duplicate userId detected');
  });

  it('should find all users', async () => {
    test.repo.findAll.mockResolvedValueOnce([mockUser]);
    const result = await test.service.findAll();
    expect(result).toEqual([mockUser]);
  });

  it('should find one user', async () => {
    test.repo.findById.mockResolvedValueOnce(mockUser);
    const result = await test.service.findOne('u1');
    expect(result).toEqual(mockUser);
  });

  it('should update a user', async () => {
    test.repo.update.mockResolvedValueOnce(mockUser);
    const result = await test.service.update('u1', { age: 31 });
    expect(result).toEqual(mockUser);
  });

  it('should throw if user not found on update', async () => {
    test.repo.update.mockResolvedValueOnce(undefined);
    await expect(test.service.update('u1', { age: 31 })).rejects.toThrow('User with id u1 not found');
  });

  it('should delete a user', async () => {
    test.repo.delete.mockResolvedValueOnce(mockUser);
    const result = await test.service.delete('u1');
    expect(result).toEqual(mockUser);
  });
});
