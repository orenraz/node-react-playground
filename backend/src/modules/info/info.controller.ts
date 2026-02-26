import { Controller, Get } from '@nestjs/common';

const backendPkg: any = require('../../../package.json');

@Controller('info')
export class InfoController {
  @Get('hello')
  getHello() {
    return {
      app: backendPkg.name || 'backend',
      version: backendPkg.version || '0.0.0',
    };
  }
}
