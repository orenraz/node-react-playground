import { UserService } from '@src/modules/user/user.service';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { CreateUserDto } from '@src/modules/user/dto/create-user.dto';
import { BaseUnitTest } from '@test/unit/common/BaseUnitTest';
import { UnitUserTestUtils } from '@test/unit/common/user/unitUserTestUtils';

jest.mock('@src/modules/user/repositories/user.repository');

class UserServiceUnitTest extends BaseUnitTest {
  service!: UserService;
  repo!: jest.Mocked<UserRepository>;
  userUtils = new UnitUserTestUtils();

  async beforeEach() {
    await super.beforeEach();
    this.repo = new UserRepository({} as any) as jest.Mocked<UserRepository>;
    this.service = new UserService(this.repo);
  }

  async testCreateUser() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.repo.create.mockResolvedValueOnce(mockUser);
    const result = await this.service.create(createDto);
    expect(result).toEqual(mockUser);
  }

  async testDuplicateUserId() {
    const createDto = this.userUtils.generateUserData();
    this.repo.create.mockRejectedValueOnce({ code: 11000 });
    await expect(this.service.create(createDto)).rejects.toThrow('Duplicate userId detected');
  }

  async testFindAllUsers() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.repo.findAll.mockResolvedValueOnce([mockUser]);
    const result = await this.service.findAll();
    expect(result).toEqual([mockUser]);
  }

  async testFindOneUser() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.repo.findByUserId.mockResolvedValueOnce(mockUser);
    const result = await this.service.findOne('u1');
    expect(result).toEqual(mockUser);
  }

  async testUpdateUser() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.repo.updateByUserId.mockResolvedValueOnce(mockUser);
    const result = await this.service.update('u1', { age: 31 });
    expect(result).toEqual(mockUser);
  }

  async testUpdateUserNotFound() {
    this.repo.updateByUserId.mockResolvedValueOnce(undefined);
    await expect(this.service.update('u1', { age: 31 })).rejects.toThrow('User with userId u1 not found');
  }

  async testDeleteUser() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.repo.deleteByUserId.mockResolvedValueOnce(mockUser);
    const result = await this.service.delete('u1');
    expect(result).toEqual(mockUser);
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
    await test.testCreateUser();
  });

  it('should handle duplicate userId error', async () => {
    await test.testDuplicateUserId();
  });

  it('should find all users', async () => {
    await test.testFindAllUsers();
  });

  it('should find one user', async () => {
    await test.testFindOneUser();
  });

  it('should update a user', async () => {
    await test.testUpdateUser();
  });

  it('should throw if user not found on update', async () => {
    await test.testUpdateUserNotFound();
  });

  it('should delete a user', async () => {
    await test.testDeleteUser();
  });
});
