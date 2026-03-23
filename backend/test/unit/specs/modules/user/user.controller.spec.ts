import { UserController } from '@src/modules/user/user.controller';
import { UserService } from '@src/modules/user/user.service';
import { BaseUnitTest } from '@test/unit/common/BaseUnitTest';
import { UnitUserTestUtils } from '@test/unit/common/user/unitUserTestUtils';

class UserControllerUnitTest extends BaseUnitTest {
  controller!: UserController;
  service!: jest.Mocked<UserService>;
  userUtils = new UnitUserTestUtils();

  async beforeEach() {
    await super.beforeEach();
    this.service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    this.controller = new UserController(this.service);
  }

  async testCreateUser() {
    const createDto = this.userUtils.generateUserData();
    // Simulate backend-generated userId in returned User
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.service.create.mockResolvedValueOnce(mockUser);
    const result = await this.controller.create(createDto);
    expect(result).toEqual(mockUser);
    expect(this.service.create).toHaveBeenCalledWith(createDto);
  }

  async testFindAllUsers() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.service.findAll.mockResolvedValueOnce([mockUser]);
    const result = await this.controller.findAll();
    expect(result).toEqual([mockUser]);
    expect(this.service.findAll).toHaveBeenCalled();
  }

  async testFindOneUser() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.service.findOne.mockResolvedValueOnce(mockUser);
    const result = await this.controller.findOne(mockUser.userId);
    expect(result).toEqual(mockUser);
    expect(this.service.findOne).toHaveBeenCalledWith(mockUser.userId);
  }

  async testUpdateUser() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.service.create.mockResolvedValueOnce(mockUser);
    const created = await this.controller.create(createDto);
    expect(created).toEqual(mockUser);
    expect(this.service.create).toHaveBeenCalledWith(createDto);

    const updateDto = { age: 31 };
    const updatedUser = { ...mockUser, ...updateDto };
    this.service.update.mockResolvedValueOnce(updatedUser);
    const result = await this.controller.update(mockUser.userId, updateDto);
    expect(result).toEqual(updatedUser);
    expect(this.service.update).toHaveBeenCalledWith(mockUser.userId, updateDto);

    this.service.delete.mockResolvedValueOnce(updatedUser);
    const deleted = await this.controller.delete(mockUser.userId);
    expect(deleted).toEqual(updatedUser);
    expect(this.service.delete).toHaveBeenCalledWith(mockUser.userId);
  }

  async testDeleteUser() {
    const createDto = this.userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    this.service.delete.mockResolvedValueOnce(mockUser);
    const result = await this.controller.delete(mockUser.userId);
    expect(result).toEqual(mockUser);
    expect(this.service.delete).toHaveBeenCalledWith(mockUser.userId);
  }
}

describe('UserController', () => {
  const test = new UserControllerUnitTest();

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

  it('should find all users', async () => {
    await test.testFindAllUsers();
  });

  it('should find one user', async () => {
    await test.testFindOneUser();
  });

  it('should update a user', async () => {
    await test.testUpdateUser();
  });

  it('should delete a user', async () => {
    await test.testDeleteUser();
  });
});

