"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const user_service_1 = require("@src/modules/user/user.service");
const BaseE2ETest_1 = require("@test/e2e/common/BaseE2ETest");
const e2eUserTestUtils_1 = require("@test/e2e/common/user/e2eUserTestUtils");
class UserE2ESpec extends BaseE2ETest_1.BaseE2ETest {
    userService;
    userUtils;
    createdUserIds = [];
    async beforeAll() {
        await super.beforeAll();
        this.userService = this.app.get(user_service_1.UserService);
        this.userUtils = new e2eUserTestUtils_1.E2EUserTestUtils();
    }
    async afterEach() {
        for (const userId of this.createdUserIds) {
            await this.userUtils.deleteUser(this.app, userId);
        }
        this.createdUserIds = [];
        await super.afterEach();
    }
    async testCreateUser() {
        const userData = this.userUtils.generateUserData();
        const user = await this.userService.create(userData);
        this.createdUserIds.push(user.userId);
        expect(user).toHaveProperty('id');
        expect(user.userId).toBe(userData.userId);
        expect(user.firstName).toBe(userData.firstName);
        expect(user.lastName).toBe(userData.lastName);
        expect(user.gender).toBe(userData.gender);
        expect(user.age).toBe(userData.age);
        expect(typeof user.userId).toBe('string');
        expect(typeof user.firstName).toBe('string');
        expect(typeof user.lastName).toBe('string');
        expect(typeof user.gender).toBe('string');
        expect(typeof user.age).toBe('number');
    }
    async testCreateUserMissingFields() {
        const incompleteData = { name: 'Bob' };
        const response = await (0, supertest_1.default)(this.app).post('/users').send(incompleteData);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(typeof response.body.error).toBe('string');
        expect(response.body.error.length).toBeGreaterThan(0);
    }
    async testCreateUserInvalidEmail() {
        const invalidEmailData = { name: 'Charlie', email: 'not-an-email', password: 'pass123' };
        const response = await (0, supertest_1.default)(this.app).post('/users').send(invalidEmailData);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(typeof response.body.error).toBe('string');
        expect(response.body.error.length).toBeGreaterThan(0);
    }
    async testDuplicateUserId() {
        const userData = this.userUtils.generateUserData({ userId: 'duplicateUser' });
        await this.userService.create(userData);
        let error;
        try {
            await this.userService.create(userData);
        }
        catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect(typeof error.message).toBe('string');
        expect(error.message.length).toBeGreaterThan(0);
    }
    async testReturnUserDetails() {
        const userData = this.userUtils.generateUserData();
        const user = await this.userService.create(userData);
        this.createdUserIds.push(user.userId);
        const response = await (0, supertest_1.default)(this.app).get(`/users/${user.userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(typeof response.body.id).toBe('string');
        expect(response.body).toHaveProperty('userId');
        expect(typeof response.body.userId).toBe('string');
        expect(response.body).toHaveProperty('firstName');
        expect(typeof response.body.firstName).toBe('string');
        expect(response.body).toHaveProperty('lastName');
        expect(typeof response.body.lastName).toBe('string');
        expect(response.body).toHaveProperty('gender');
        expect(typeof response.body.gender).toBe('string');
        expect(response.body).toHaveProperty('age');
        expect(typeof response.body.age).toBe('number');
        expect(response.body.userId).toBe(userData.userId);
        expect(response.body.firstName).toBe(userData.firstName);
        expect(response.body.lastName).toBe(userData.lastName);
        expect(response.body.gender).toBe(userData.gender);
        expect(response.body.age).toBe(userData.age);
    }
    async testReturn404ForNonExistentUser() {
        const response = await (0, supertest_1.default)(this.app).get('/users/invalid-id');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(typeof response.body.error).toBe('string');
        expect(response.body.error.length).toBeGreaterThan(0);
    }
}
describe('User API e2e', () => {
    let testClass;
    beforeAll(async () => {
        testClass = new UserE2ESpec();
        await testClass.beforeAll();
    });
    afterEach(async () => {
        await testClass.afterEach();
    });
    it('should create a user (happy path)', async () => {
        await testClass.testCreateUser();
    });
    it('should not create a user with missing fields (edge case)', async () => {
        await testClass.testCreateUserMissingFields();
    });
    it('should not create a user with invalid email (error handling)', async () => {
        await testClass.testCreateUserInvalidEmail();
    });
    it('should handle duplicate userId registration (error handling)', async () => {
        await testClass.testDuplicateUserId();
    });
    it('should return user details (happy path)', async () => {
        await testClass.testReturnUserDetails();
    });
    it('should return 404 for non-existent user (edge case)', async () => {
        await testClass.testReturn404ForNonExistentUser();
    });
});
//# sourceMappingURL=user.e2e-spec.js.map