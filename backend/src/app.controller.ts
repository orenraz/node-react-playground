import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const backendPkg: any = require('../package.json');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
  }

  @Get('hello')
  getHelloWorld() {
    return {
      app: backendPkg.name || 'backend',
      version: backendPkg.version || '0.0.0'
    };
  }
}
