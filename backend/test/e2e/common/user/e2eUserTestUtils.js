"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E2EUserTestUtils = void 0;
const user_service_1 = require("@src/modules/user/user.service");
const baseUserTestUtils_1 = require("@test/common/user/baseUserTestUtils");
class E2EUserTestUtils extends baseUserTestUtils_1.BaseUserTestIUtils {
    async createUser(app, overrides = {}) {
        const userService = app.get(user_service_1.UserService);
        const mockUserData = this.generateUserData(overrides);
        const createdUser = await userService.create(mockUserData);
        return { createdUser, mockUserData };
    }
    async deleteUser(app, userId) {
        const userService = app.get(user_service_1.UserService);
        return await userService.delete(userId);
    }
}
exports.E2EUserTestUtils = E2EUserTestUtils;
//# sourceMappingURL=e2eUserTestUtils.js.map