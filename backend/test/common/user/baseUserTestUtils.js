"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUserTestIUtils = void 0;
const uuid_1 = require("uuid");
const gender_enum_1 = require("@src/modules/user/enums/gender.enum");
class BaseUserTestIUtils {
    generateUserData(overrides = {}) {
        const uuid = (0, uuid_1.v4)();
        const genderValues = Object.values(gender_enum_1.Gender);
        const randomGender = genderValues[Math.floor(Math.random() * genderValues.length)];
        const randomAge = Math.floor(Math.random() * 121);
        return {
            userId: overrides.userId ?? `user_${uuid}`,
            firstName: overrides.firstName ?? `First_Name_${uuid}`,
            lastName: overrides.lastName ?? `Last_Name_${uuid}`,
            gender: overrides.gender ?? randomGender,
            age: overrides.age ?? randomAge,
        };
    }
}
exports.BaseUserTestIUtils = BaseUserTestIUtils;
//# sourceMappingURL=baseUserTestUtils.js.map