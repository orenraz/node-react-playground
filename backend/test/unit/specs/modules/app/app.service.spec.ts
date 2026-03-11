import { AppService } from '@src/app.service';

describe('AppService', () => {
	let service: AppService;

	beforeEach(() => {
		service = new AppService();
	});

	it('should return hello message', () => {
		const result = service.getHello();
		expect(result).toEqual({ message: 'Hello from backend' });
	});
});