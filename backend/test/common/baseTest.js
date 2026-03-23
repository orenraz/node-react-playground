"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTest = void 0;
const testing_1 = require("@nestjs/testing");
const app_module_1 = require("@src/app.module");
class BaseTest {
    module = undefined;
    appInstance = undefined;
    config = undefined;
    async beforeAll() {
        await this.setupApp();
    }
    async afterAll() {
        await this.teardownApp();
    }
    async beforeEach() {
    }
    afterEach() {
    }
    async setupApp() {
        if (this.appInstance) {
            return this.appInstance;
        }
        await this.initializeApp();
        return this.getApp();
    }
    async initializeApp() {
        this.loadConfigIfNeeded();
        const module = await this.createTestingModule();
        const app = await this.createNestApp(module);
        this.module = module;
        this.appInstance = app;
    }
    async createTestingModule() {
        return await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
    }
    async teardownApp() {
        if (this.appInstance) {
            await this.appInstance.close();
            this.appInstance = undefined;
        }
    }
    getApp() {
        return this.appInstance;
    }
    loadConfigIfNeeded() {
        if (!this.config) {
            const testType = process.env.TEST_TYPE;
            if (testType === 'e2e') {
                this.config = require('../e2e/config/e2e-config').e2eConfig();
            }
            else if (testType === 'unit') {
                this.config = require('../unit/config/unit-config').unitConfig();
            }
            else {
                throw new Error('Config missing or TEST_TYPE not recognized. Set TEST_TYPE=unit or TEST_TYPE=e2e in your test script.');
            }
        }
    }
    async createNestApp(module) {
        const app = module.createNestApplication();
        await app.init();
        return app;
    }
}
exports.BaseTest = BaseTest;
exports.default = BaseTest;
//# sourceMappingURL=baseTest.js.map