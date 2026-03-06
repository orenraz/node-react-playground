import { Logger } from '@nestjs/common';

// Refactor `MongoConfigBuilder` to use a constructor for building the configuration
export class MongoConfigLoader {
  public uri: string;
  public dbName: string;
  public protocol: string;
  public user: string;
  public password: string;
  public host: string;
  public options: string | undefined;

  constructor() {
    this.protocol = process.env.MONGODB_PROTOCOL;
    this.user = process.env.MONGODB_USER;
    this.password = process.env.MONGODB_PASSWORD;
    this.host = process.env.MONGODB_HOST;
    this.dbName = process.env.MONGODB_DB_NAME;
    this.options = process.env.MONGODB_OPTIONS;

    this.uri = MongoConfigLoader.buildConnectionString({
      protocol: this.protocol,
      user: this.user,
      password: this.password,
      host: this.host,
      dbName: this.dbName,
    });
  }

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