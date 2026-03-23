"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_controller_1 = require("@src/app.controller");
const app_service_1 = require("@src/app.service");
const BaseUnitTest_1 = require("@test/unit/common/BaseUnitTest");
describe('AppController', () => {
    class AppControllerUnitTest extends BaseUnitTest_1.BaseUnitTest {
        controller;
        service;
        async beforeEach() {
            await super.beforeEach();
            this.service = new app_service_1.AppService();
            this.controller = new app_controller_1.AppController(this.service);
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
//# sourceMappingURL=app.controller.spec.js.map