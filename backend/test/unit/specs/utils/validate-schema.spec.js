"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_schema_1 = __importDefault(require("@src/validation/env-schema"));
const validate_schema_1 = require("@src/utils/validate-schema");
describe('validateSchema', () => {
    it('should normalize and validate a complete environment object', () => {
        const obj = {
            env: 'Production',
            port: '8080',
            logLevel: 'INFO',
            ALLOWED_ORIGINS: 'http://localhost:3000',
            TEST_TIMEOUT: 5000
        };
        const result = (0, validate_schema_1.validateSchema)(env_schema_1.default, obj);
        expect(result.NODE_ENV).toBe('production');
        expect(result.PORT).toBe(8080);
        expect(result.LOG_LEVEL).toBe('info');
        expect(result.ALLOWED_ORIGINS).toBe('http://localhost:3000');
        expect(result.TEST_TIMEOUT).toBe(5000);
    });
    it('should throw error for invalid NODE_ENV', () => {
        const obj = {
            env: 'invalid',
            port: '8080',
            logLevel: 'INFO',
            ALLOWED_ORIGINS: 'http://localhost:3000',
            TEST_TIMEOUT: 5000
        };
        expect(() => (0, validate_schema_1.validateSchema)(env_schema_1.default, obj)).toThrow(/NODE_ENV must be one of/);
    });
    it('should throw error for missing required fields', () => {
        const obj = {
            env: 'production',
            port: '8080',
            logLevel: 'info'
        };
        expect(() => (0, validate_schema_1.validateSchema)(env_schema_1.default, obj)).toThrow(/ALLOWED_ORIGINS must be/);
    });
    it('should throw error for invalid PORT', () => {
        const obj = {
            env: 'production',
            port: '999',
            logLevel: 'info',
            ALLOWED_ORIGINS: 'http://localhost:3000'
        };
        expect(() => (0, validate_schema_1.validateSchema)(env_schema_1.default, obj)).toThrow(/PORT must be a number between/);
    });
    it('should throw error for invalid LOG_LEVEL', () => {
        const obj = {
            env: 'production',
            port: '8080',
            logLevel: 'verbose',
            ALLOWED_ORIGINS: 'http://localhost:3000'
        };
        expect(() => (0, validate_schema_1.validateSchema)(env_schema_1.default, obj)).toThrow(/LOG_LEVEL must be one of/);
    });
});
//# sourceMappingURL=validate-schema.spec.js.map