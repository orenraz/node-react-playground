"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("@src/modules/user/user.controller");
const BaseUnitTest_1 = require("@test/unit/common/BaseUnitTest");
const unitUserTestUtils_1 = require("@test/unit/common/user/unitUserTestUtils");
class UserControllerUnitTest extends BaseUnitTest_1.BaseUnitTest {
    controller;
    service;
    userUtils = new unitUserTestUtils_1.UnitUserTestUtils();
    async beforeEach() {
        await super.beforeEach();
        this.service = {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        this.controller = new user_controller_1.UserController(this.service);
    }
    async testCreateUser() {
        const mockUser = this.userUtils.generateUserData();
        this.service.create.mockResolvedValueOnce(mockUser);
        const result = await this.controller.create(mockUser);
        expect(result).toEqual(mockUser);
        expect(this.service.create).toHaveBeenCalledWith(mockUser);
    }
    async testFindAllUsers() {
        const mockUser = this.userUtils.generateUserData();
        this.service.findAll.mockResolvedValueOnce([mockUser]);
        const result = await this.controller.findAll();
        expect(result).toEqual([mockUser]);
        expect(this.service.findAll).toHaveBeenCalled();
    }
    async testFindOneUser() {
        const mockUser = this.userUtils.generateUserData();
        this.service.findOne.mockResolvedValueOnce(mockUser);
        const result = await this.controller.findOne(mockUser.userId);
        expect(result).toEqual(mockUser);
        expect(this.service.findOne).toHaveBeenCalledWith(mockUser.userId);
    }
    async testUpdateUser() {
        const mockUser = this.userUtils.generateUserData();
        this.service.create.mockResolvedValueOnce(mockUser);
        const created = await this.controller.create(mockUser);
        expect(created).toEqual(mockUser);
        expect(this.service.create).toHaveBeenCalledWith(mockUser);
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
        const mockUser = this.userUtils.generateUserData();
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
//# sourceMappingURL=user.controller.spec.js.map