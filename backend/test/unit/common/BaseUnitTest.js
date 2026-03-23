"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUnitTest = void 0;
const baseTest_1 = __importDefault(require("../../common/baseTest"));
class BaseUnitTest extends baseTest_1.default {
    async beforeAll() {
        await super.beforeAll();
    }
    async beforeEach() {
        await super.beforeEach();
    }
    async afterAll() {
        await super.afterAll();
    }
    afterEach() {
        super.afterEach();
        jest.clearAllMocks();
    }
}
exports.BaseUnitTest = BaseUnitTest;
//# sourceMappingURL=BaseUnitTest.js.map