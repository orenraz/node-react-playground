import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  getMongoConfig() {
    return {
      uri: this.configService.get<string>('mongodb.uri'),
      dbName: this.configService.get<string>('mongodb.dbName'),
      protocol: this.configService.get<string>('mongodb.protocol'),
      user: this.configService.get<string>('mongodb.user'),
      password: this.configService.get<string>('mongodb.password'),
      host: this.configService.get<string>('mongodb.host'),
      options: this.configService.get<string>('mongodb.options'),
    };
  }
}