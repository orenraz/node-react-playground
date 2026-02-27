import { Logger } from '@nestjs/common';

export class MongoConfigBuilder {
  static buildConnectionString({ protocol, user, password, host, dbName }: {
    protocol: string;
    user: string;
    password: string;
    host: string;
    dbName: string;
  }): string {
    const sanitizedOptions = process.env.MONGODB_OPTIONS?.replace(/useNewUrlParser|useUnifiedTopology/g, '') || '';
    return `${protocol}://${user}:${password}@${host}/${dbName}?${sanitizedOptions}`;
  }
}