
import envSchema from '@src/validation/env-schema';
import { validateSchema } from '@src/utils/validate-schema';

describe('validateSchema', () => {
	it('should normalize and validate a complete environment object', () => {
		const obj = {
			env: 'Production',
			port: '8080',
			logLevel: 'INFO',
			ALLOWED_ORIGINS: 'http://localhost:3000',
			TEST_TIMEOUT: 5000
		};
		const result = validateSchema(envSchema, obj);
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
		expect(() => validateSchema(envSchema, obj)).toThrow(/NODE_ENV must be one of/);
	});

	it('should throw error for missing required fields', () => {
		const obj = {
			env: 'production',
			port: '8080',
			logLevel: 'info'
			// ALLOWED_ORIGINS missing
		};
		expect(() => validateSchema(envSchema, obj)).toThrow(/ALLOWED_ORIGINS must be/);
	});

	it('should throw error for invalid PORT', () => {
		const obj = {
			env: 'production',
			port: '999',
			logLevel: 'info',
			ALLOWED_ORIGINS: 'http://localhost:3000'
		};
		expect(() => validateSchema(envSchema, obj)).toThrow(/PORT must be a number between/);
	});

	it('should throw error for invalid LOG_LEVEL', () => {
		const obj = {
			env: 'production',
			port: '8080',
			logLevel: 'verbose',
			ALLOWED_ORIGINS: 'http://localhost:3000'
		};
		expect(() => validateSchema(envSchema, obj)).toThrow(/LOG_LEVEL must be one of/);
	});
});
