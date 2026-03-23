"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseE2ETest = void 0;
const baseTest_1 = __importDefault(require("@test/common/baseTest"));
const mongoose_1 = __importDefault(require("mongoose"));
class BaseE2ETest extends baseTest_1.default {
    async beforeAll() {
        await super.beforeAll();
        await mongoose_1.default.connect(this.config?.mongodb?.URI);
    }
    async afterAll() {
        await super.afterAll();
        await mongoose_1.default.disconnect();
    }
    async beforeEach() {
        await super.beforeEach();
    }
    afterEach() {
        super.afterEach();
    }
    get app() {
        return this.getApp();
    }
}
exports.BaseE2ETest = BaseE2ETest;
//# sourceMappingURL=BaseE2ETest.js.map