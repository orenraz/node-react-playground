"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_service_1 = require("@src/app.service");
describe('AppService', () => {
    let service;
    beforeEach(() => {
        service = new app_service_1.AppService();
    });
    it('should return hello message', () => {
        const result = service.getHello();
        expect(result).toEqual({ message: 'Hello from backend' });
    });
});
//# sourceMappingURL=app.service.spec.js.map