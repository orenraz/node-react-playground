import request from 'supertest';
import { UserService } from '@src/modules/user/user.service';
import { BaseE2ETest } from '@test/e2e/common/BaseE2ETest';
import { E2EUserTestUtils } from '@test/e2e/common/user/e2eUserTestUtils';

class UserE2ESpec extends BaseE2ETest {
  userService!: UserService;
  userUtils!: E2EUserTestUtils;
  createdUserIds: string[] = [];

  async beforeAll() {
    await super.beforeAll();
    this.userService = this.app.get(UserService);
    this.userUtils = new E2EUserTestUtils();
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
    expect(typeof user.userId).toBe('string');
    expect(user.firstName).toBe(userData.firstName);
    expect(user.lastName).toBe(userData.lastName);
    expect(user.gender).toBe(userData.gender);
    expect(user.age).toBe(userData.age);
    expect(typeof user.firstName).toBe('string');
    expect(typeof user.lastName).toBe('string');
    expect(typeof user.gender).toBe('string');
    expect(typeof user.age).toBe('number');
  }

  async testCreateUserMissingFields() {
    const incompleteData = { name: 'Bob' };
    const response = await request(this.app).post('/users').send(incompleteData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
    expect(response.body.error.length).toBeGreaterThan(0);
  }

  async testCreateUserInvalidEmail() {
    const invalidEmailData = { name: 'Charlie', email: 'not-an-email', password: 'pass123' };
    const response = await request(this.app).post('/users').send(invalidEmailData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
    expect(response.body.error.length).toBeGreaterThan(0);
  }

  async testDuplicateUserId() {
      // Since userId is generated in backend, test duplicate by creating two users with same data (should not error)
      const userData = this.userUtils.generateUserData();
      const user1 = await this.userService.create(userData);
      const user2 = await this.userService.create(userData);
      expect(user1.userId).not.toBe(user2.userId);
      expect(user1.firstName).toBe(user2.firstName);
      expect(user1.lastName).toBe(user2.lastName);
      expect(user1.gender).toBe(user2.gender);
      expect(user1.age).toBe(user2.age);
  }

  async testReturnUserDetails() {
    const userData = this.userUtils.generateUserData();
    const user = await this.userService.create(userData);
    this.createdUserIds.push(user.userId);
    const response = await request(this.app).get(`/users/${user.userId}`);
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
    // Only compare userId to user.userId, not userData
    expect(response.body.userId).toBe(user.userId);
    expect(response.body.firstName).toBe(userData.firstName);
    expect(response.body.lastName).toBe(userData.lastName);
    expect(response.body.gender).toBe(userData.gender);
    expect(response.body.age).toBe(userData.age);
  }

  async testReturn404ForNonExistentUser() {
    const response = await request(this.app).get('/users/invalid-id');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
    expect(response.body.error.length).toBeGreaterThan(0);
  }
}

describe('User API e2e', () => {
  let testClass: UserE2ESpec;

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
