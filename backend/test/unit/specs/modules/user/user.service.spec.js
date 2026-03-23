"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("@src/modules/user/user.service");
const user_repository_1 = require("@src/modules/user/repositories/user.repository");
const BaseUnitTest_1 = require("@test/unit/common/BaseUnitTest");
const unitUserTestUtils_1 = require("@test/unit/common/user/unitUserTestUtils");
jest.mock('@src/modules/user/repositories/user.repository');
class UserServiceUnitTest extends BaseUnitTest_1.BaseUnitTest {
    service;
    repo;
    userUtils = new unitUserTestUtils_1.UnitUserTestUtils();
    async beforeEach() {
        await super.beforeEach();
        this.repo = new user_repository_1.UserRepository({});
        this.service = new user_service_1.UserService(this.repo);
    }
    async testCreateUser() {
        const mockUser = this.userUtils.generateUserData();
        this.repo.create.mockResolvedValueOnce(mockUser);
        const dto = { ...mockUser };
        const result = await this.service.create(dto);
        expect(result).toEqual(mockUser);
    }
    async testDuplicateUserId() {
        const mockUser = this.userUtils.generateUserData();
        this.repo.create.mockRejectedValueOnce({ code: 11000 });
        const dto = { ...mockUser };
        await expect(this.service.create(dto)).rejects.toThrow('Duplicate userId detected');
    }
    async testFindAllUsers() {
        const mockUser = this.userUtils.generateUserData();
        this.repo.findAll.mockResolvedValueOnce([mockUser]);
        const result = await this.service.findAll();
        expect(result).toEqual([mockUser]);
    }
    async testFindOneUser() {
        const mockUser = this.userUtils.generateUserData();
        this.repo.findByUserId.mockResolvedValueOnce(mockUser);
        const result = await this.service.findOne('u1');
        expect(result).toEqual(mockUser);
    }
    async testUpdateUser() {
        const mockUser = this.userUtils.generateUserData();
        this.repo.updateByUserId.mockResolvedValueOnce(mockUser);
        const result = await this.service.update('u1', { age: 31 });
        expect(result).toEqual(mockUser);
    }
    async testUpdateUserNotFound() {
        this.repo.updateByUserId.mockResolvedValueOnce(undefined);
        await expect(this.service.update('u1', { age: 31 })).rejects.toThrow('User with userId u1 not found');
    }
    async testDeleteUser() {
        const mockUser = this.userUtils.generateUserData();
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
//# sourceMappingURL=user.service.spec.js.map