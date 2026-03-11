import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { BaseUnitTest } from '@test/unit/common/BaseUnitTest';


describe('AppController', () => {

	class AppControllerUnitTest extends BaseUnitTest {
		controller!: AppController;
		service!: AppService;

		async beforeEach() {
			await super.beforeEach();
			this.service = new AppService();
			this.controller = new AppController(this.service);
		}
	}

	describe('AppController', () => {
		const test = new AppControllerUnitTest();

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

		it('should return hello from root', () => {
			expect(test.controller.getRoot()).toEqual({ message: 'Hello from backend' });
		});

		it('should return health status', () => {
			const health = test.controller.getHealth();
			expect(health.status).toBe('ok');
			expect(typeof health.uptime).toBe('number');
			expect(typeof health.timestamp).toBe('string');
		});

		it('should return app info for hello', () => {
			const hello = test.controller.getHelloWorld();
			expect(hello.app).toBeDefined();
			expect(hello.version).toBeDefined();
		});
	});
});



    