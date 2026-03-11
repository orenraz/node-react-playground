import { UserController } from '@src/modules/user/user.controller';
import { UserService } from '@src/modules/user/user.service';
import { BaseUnitTest } from '@test/unit/common/BaseUnitTest';

describe('UserController', () => {

    const mockUser = {
    userId: 'u1',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    age: 30,
    };

    const mockService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
    };

    class UserControllerUnitTest extends BaseUnitTest {
    controller!: UserController;

    async beforeEach() {
        await super.beforeEach();
        this.controller = new UserController(mockService as unknown as UserService);
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
        const dto = { ...mockUser };
        const result = await test.controller.create(dto);
        expect(result).toEqual({
        userId: mockUser.userId,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        gender: mockUser.gender,
        age: mockUser.age,
        });
    });

    it('should find all users', async () => {
        const result = await test.controller.findAll();
        expect(result).toEqual([mockUser]);
    });

    it('should find one user', async () => {
        const result = await test.controller.findOne('u1');
        expect(result).toEqual(mockUser);
    });

    it('should update a user', async () => {
        const result = await test.controller.update('u1', { age: 31 });
        expect(result).toEqual(mockUser);
    });

    it('should delete a user', async () => {
        const result = await test.controller.delete('u1');
        expect(result).toEqual(mockUser);
    });
    });
});

