"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUnit = createUserUnit;
exports.deleteUserUnit = deleteUserUnit;
async function createUserUnit(service, userData) {
    return await service.create(userData);
}
async function deleteUserUnit(service, userId) {
    return await service.delete(userId);
}
//# sourceMappingURL=userTestUtils.js.map