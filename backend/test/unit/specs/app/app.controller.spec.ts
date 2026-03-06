import { ControllerTestBase } from '../../setup/common/ControllerTestBase';
import { AppController } from '../../../../src/app.controller';
import { AppService } from '../../../../src/app.service';

describe('AppController', () => {
  class AppControllerTest extends ControllerTestBase<AppController, AppService> {
    getControllerClass() {
      return AppController;
    }

    getServiceClass() {
      return AppService;
    }

    getProviders() {
      return [AppService];
    }
  }

  const test = new AppControllerTest();

  beforeAll(async () => {
    await test.setup();
  });

  describe('getRoot', () => {
    it('should return "Hello World!"', () => {
      jest.spyOn(test.getService(), 'getHello').mockReturnValue({ message: 'Hello World!' });
      expect(test.getController().getRoot()).toEqual({ message: 'Hello World!' });
    });
  });
});