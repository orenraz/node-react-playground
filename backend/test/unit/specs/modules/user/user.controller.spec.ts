import { UserController } from '@src/modules/user/user.controller';
import { UserService } from '@src/modules/user/user.service';
import { UnitUserTestUtils } from '@test/unit/common/user/unitUserTestUtils';


describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;
  let userUtils: UnitUserTestUtils;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    controller = new UserController(service);
    userUtils = new UnitUserTestUtils();
  });

  it('should create a user', async () => {
    const createDto = userUtils.generateUserData({ password: 'testpass123' });
    expect(createDto.email).toBeDefined();
    const mockUser = { ...createDto, userId: 'generated-id' };
    if (createDto.birthDate) mockUser.birthDate = createDto.birthDate;
    delete mockUser.password;
    service.create.mockResolvedValueOnce(mockUser as any);
    const result = await controller.create(createDto);
    expect(result).toMatchObject(mockUser);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should find all users', async () => {
    const createDto = userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    if (createDto.birthDate) mockUser.birthDate = createDto.birthDate;
    service.findAll.mockResolvedValueOnce([mockUser as any]);
    const result = await controller.findAll();
    expect(result).toMatchObject([mockUser]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const createDto = userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    if (createDto.birthDate) mockUser.birthDate = createDto.birthDate;
    service.findOne.mockResolvedValueOnce(mockUser as any);
    const result = await controller.findOne(mockUser.userId);
    expect(result).toMatchObject(mockUser);
    expect(service.findOne).toHaveBeenCalledWith(mockUser.userId);
  });

  it('should update a user', async () => {
    const createDto = userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    if (createDto.birthDate) mockUser.birthDate = createDto.birthDate;
    const updateDto: any = {
      email: createDto.email,
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      ...(createDto.gender && { gender: createDto.gender }),
      ...(createDto.birthDate && { birthDate: '1990-01-01T00:00:00.000Z' }),
      ...(createDto.googleId && { googleId: createDto.googleId }),
      ...(createDto.provider && { provider: createDto.provider }),
    };
    const updatedUser = { ...mockUser, ...updateDto };
    if (updateDto.birthDate) updatedUser.birthDate = updateDto.birthDate;
    service.update.mockResolvedValueOnce(updatedUser as any);
    const result = await controller.update(mockUser.userId, updateDto);
    expect(result).toMatchObject(updatedUser);
    expect(service.update).toHaveBeenCalledWith(mockUser.userId, updateDto);
  });

  it('should delete a user', async () => {
    const createDto = userUtils.generateUserData();
    const mockUser = { ...createDto, userId: 'generated-id' };
    if (createDto.birthDate) mockUser.birthDate = createDto.birthDate;
    service.delete.mockResolvedValueOnce(mockUser as any);
    const result = await controller.delete(mockUser.userId);
    expect(result).toMatchObject(mockUser);
    expect(service.delete).toHaveBeenCalledWith(mockUser.userId);
  });
});


