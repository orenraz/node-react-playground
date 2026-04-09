
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
    controller = new AppController(service);
  });

  it('should return hello from root', () => {
    expect(controller.getRoot()).toEqual({ message: 'Hello from backend' });
  });

  it('should return health status', () => {
    const health = controller.getHealth();
    expect(health.status).toBe('ok');
    expect(typeof health.uptime).toBe('number');
    expect(typeof health.timestamp).toBe('string');
  });

  it('should return app info for hello', () => {
    const hello = controller.getHelloWorld();
    expect(hello.app).toBeDefined();
    expect(hello.version).toBeDefined();
  });
});



    