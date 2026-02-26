import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  private getDatabaseStatus() {
    const dbStatus = this.connection.readyState === 1 ? 'connected' : 'disconnected';
    const isHealthy = this.connection.readyState === 1;

    return {
      status: isHealthy ? 'ok' : 'degraded',
      database: {
        status: dbStatus,
        name: this.connection.name,
        host: this.connection.host,
      },
    };
  }

  @Get()
  async getHealth() {
    const dbInfo = this.getDatabaseStatus();

    return {
      ...dbInfo,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
