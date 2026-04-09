		
import { Gender } from '@src/modules/user/enums/gender.enum';	
import { UserService } from '@src/modules/user/user.service';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupE2EApp, teardownE2EApp } from '@test/e2e/common/e2e-setup';
import { E2EUserTestUtils } from '@test/e2e/common/user/e2eUserTestUtils';

describe('User API e2e', () => {
	let app: INestApplication;
	let userUtils: E2EUserTestUtils;
	let userService: UserService;
	const createdUserIds: string[] = [];

	beforeAll(async () => {
		app = await setupE2EApp();
		userUtils = new E2EUserTestUtils();
		userService = app.get(UserService);
	});

	afterAll(async () => {
		// Delete all created users before closing the app
		for (let i = createdUserIds.length - 1; i >= 0; i--) {
			const userId = createdUserIds[i];
			try {
				await userService.delete(userId);
				createdUserIds.splice(i, 1);
			} catch (err) {
				// Ignore errors (e.g., user already deleted)
			}
		}
		await teardownE2EApp(app);  
	});

	it('should create a user (happy path)', async () => {
		const userData = userUtils.generateUserData({ password: 'testpass123' });
		expect(userData).not.toHaveProperty('userId');
		expect(userData).toHaveProperty('password');
		const response = await request(app.getHttpServer())
			.post('/users')
			.send(userData);
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('userId');
		// Validate all properties match (except password)
		for (const key of Object.keys(userData) as Array<keyof typeof userData>) {
			if (key === 'password') continue;
			expect(response.body[key]).toEqual(userData[key]);
		}
		// Password should not be returned
		expect(response.body).not.toHaveProperty('password');
		// userId should be a string and match the input if present (should not be present in input)
		expect(typeof response.body.userId).toBe('string');
		createdUserIds.push(response.body.userId);
	});

	it('should get a user by id', async () => {
		// Setup: create a user and add its id to the global array
		const userData = userUtils.generateUserData({ password: 'testpass456' });
		const createResponse = await request(app.getHttpServer())
			.post('/users')
			.send(userData);
		expect(createResponse.status).toBe(201);
		const userId = createResponse.body.userId;
		createdUserIds.push(userId);

		// Act: get the user by id
		const getResponse = await request(app.getHttpServer())
			.get(`/users/${userId}`);
		expect(getResponse.status).toBe(200);
		expect(getResponse.body).toHaveProperty('userId', userId);
		// Validate all properties match (except password)
		for (const key of Object.keys(userData) as Array<keyof typeof userData>) {
			if (key === 'password') continue;
			expect(getResponse.body[key]).toEqual(userData[key]);
		}
		expect(getResponse.body).not.toHaveProperty('password');
	});

  it('should update a user', async () => {
		// Setup: create a user and add its id to the global array
		const originalUserData = userUtils.generateUserData({ password: 'testpass789' });
		const createResponse = await request(app.getHttpServer())
			.post('/users')
			.send(originalUserData);
		expect(createResponse.status).toBe(201);
		const userId = createResponse.body.userId;
		createdUserIds.push(userId);

		// Prepare update data (all updateable fields except userId/password)
		const updateData: Partial<typeof originalUserData> = {
			email: 'updated_' + originalUserData.email,
			firstName: 'UpdatedFirst',
			lastName: 'UpdatedLast',
			gender: originalUserData.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE,
			birthDate: new Date('2000-01-01').toISOString(),
		};

		// Act: update the user
		const updateResponse = await request(app.getHttpServer())
			.put(`/users/${userId}`)
			.send(updateData);
		expect(updateResponse.status).toBe(200);
		expect(updateResponse.body).toHaveProperty('userId', userId);

		// Validate all updated properties match
		for (const key of Object.keys(updateData) as Array<keyof typeof updateData>) {
			expect(updateResponse.body[key]).toEqual(updateData[key]);
		}
		// Password should not be returned
		expect(updateResponse.body).not.toHaveProperty('password');
	});

  it('should delete a user', async () => {
			// Setup: create a user and add its id to the global array
			const userData = userUtils.generateUserData({ password: 'testpassDelete' });
			const createResponse = await request(app.getHttpServer())
				.post('/users')
				.send(userData);
			expect(createResponse.status).toBe(201);
			const userId = createResponse.body.userId;
			createdUserIds.push(userId);

			// Act: delete the user
			const deleteResponse = await request(app.getHttpServer())
				.delete(`/users/${userId}`);
			expect(deleteResponse.status).toBe(200);
			// Optionally, check response body for confirmation if your API returns it

			// Try to get the user, should return 404
			const getResponse = await request(app.getHttpServer())
				.get(`/users/${userId}`);
			expect(getResponse.status).toBe(404);
		});
});
