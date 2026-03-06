import { TestingModule, Test } from '@nestjs/testing';

export abstract class ControllerTestBase<TController, TService> {
  protected module!: TestingModule;
  protected controller!: TController;
  protected service!: TService;

  /**
   * Abstract method to provide the controller class.
   */
  abstract getControllerClass(): new (...args: any[]) => TController;

  /**
   * Abstract method to provide the service class.
   */
  abstract getServiceClass(): new (...args: any[]) => TService;

  /**
   * Abstract method to provide additional providers if needed.
   */
  abstract getProviders(): any[];

  /**
   * Initializes the testing module and retrieves the controller and service.
   */
  async setup() {
    this.module = await Test.createTestingModule({
      controllers: [this.getControllerClass()],
      providers: this.getProviders(),
    }).compile();

    this.controller = this.module.get<TController>(this.getControllerClass());
    this.service = this.module.get<TService>(this.getServiceClass());
  }

  /**
   * Public getter for the service instance.
   */
  public getService() {
    return this.service;
  }

  /**
   * Public getter for the controller instance.
   */
  public getController() {
    return this.controller;
  }
}