import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../config/mongo-config';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  getMongoConfig() {
    return getMongoConfig(this.configService);
  }
}