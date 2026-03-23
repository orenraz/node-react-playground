"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitUserTestUtils = void 0;
const baseUserTestUtils_1 = require("@test/common/user/baseUserTestUtils");
class UnitUserTestUtils extends baseUserTestUtils_1.BaseUserTestIUtils {
    async createUser(service, overrides = {}) {
        const userData = this.generateUserData(overrides);
        return await service.create(userData);
    }
    async deleteUser(service, userId) {
        return await service.delete(userId);
    }
}
exports.UnitUserTestUtils = UnitUserTestUtils;
//# sourceMappingURL=unitUserTestUtils.js.map