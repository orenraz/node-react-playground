
import { toIsoDateString, parseIsoDate } from '@src/utils/date';
import { UserService } from '@src/modules/user/user.service';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { UnitUserTestUtils } from '@test/unit/common/user/unitUserTestUtils';
import { DuplicateUserError } from '@src/modules/user/errors/duplicate-user.error';

describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<UserRepository>;
  let userUtils: UnitUserTestUtils;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      updateByUserId: jest.fn(),
      deleteByUserId: jest.fn(),
    } as any;
    service = new UserService(repo);
    userUtils = new UnitUserTestUtils();
  });

  it('should create a user', async () => {
    const createDto = userUtils.generateUserData({ password: 'testpass123' });
    expect(createDto.email).toBeDefined();
    const mockUser = {
      ...createDto,
      userId: 'generated-id',
      birthDate: createDto.birthDate ? parseIsoDate(createDto.birthDate) : undefined,
    };
    delete mockUser.password;
    repo.create.mockResolvedValueOnce(mockUser);
    const result = await service.create(createDto);
    expect(result).toEqual(mockUser);
  });

  it('should handle duplicate userId error', async () => {
    const createDto = userUtils.generateUserData();
    repo.create.mockRejectedValueOnce(new DuplicateUserError('Duplicate userId detected'));
    await expect(service.create(createDto)).rejects.toThrow('Duplicate userId detected');
  });

  it('should find all users', async () => {
    const createDto = userUtils.generateUserData();
    const mockUser = {
      ...createDto,
      userId: 'generated-id',
      birthDate: createDto.birthDate ? parseIsoDate(createDto.birthDate) : undefined,
    };
    repo.findAll.mockResolvedValueOnce([mockUser]);
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
  });

  it('should find one user', async () => {
    const createDto = userUtils.generateUserData();
    const mockUser = {
      ...createDto,
      userId: 'generated-id',
      birthDate: createDto.birthDate ? parseIsoDate(createDto.birthDate) : undefined,
    };
    repo.findByUserId.mockResolvedValueOnce(mockUser);
    const result = await service.findOne('u1');
    expect(result).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const createDto = userUtils.generateUserData();
    const mockUser: any = {
      ...createDto,
      userId: 'generated-id',
      birthDate: parseIsoDate('1990-01-01T00:00:00.000Z'),
    };
    const updateDto: any = {
      email: createDto.email,
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      ...(createDto.gender && { gender: createDto.gender }),
      ...(createDto.birthDate && { birthDate: '1990-01-01T00:00:00.000Z' }),
      ...(createDto.googleId && { googleId: createDto.googleId }),
      ...(createDto.provider && { provider: createDto.provider }),
    };
    repo.updateByUserId.mockResolvedValueOnce(mockUser as any);
    const result = await service.update('u1', updateDto);
    expect(result).toEqual(mockUser);
  });

  it('should throw if user not found on update', async () => {
    const createDto = userUtils.generateUserData();
    const updateDto = {
      email: createDto.email,
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      gender: createDto.gender,
      birthDate: '1990-01-01T00:00:00.000Z',
      ...(createDto.googleId && { googleId: createDto.googleId }),
      ...(createDto.provider && { provider: createDto.provider }),
    };
    repo.updateByUserId.mockResolvedValueOnce(undefined as any);
    await expect(service.update('u1', updateDto)).rejects.toThrow('User with userId u1 not found');
  });

  it('should delete a user', async () => {
    const createDto = userUtils.generateUserData();
    const mockUser = {
      ...createDto,
      userId: 'generated-id',
      birthDate: createDto.birthDate ? parseIsoDate(createDto.birthDate) : undefined,
    };
    repo.deleteByUserId.mockResolvedValueOnce(mockUser);
    const result = await service.delete('u1');
    expect(result).toEqual(mockUser);
  });
});


