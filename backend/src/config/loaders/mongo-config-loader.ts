
import { MongoConfigOverrides } from '@src/config/types/mongo-config-overrides';  

export class MongoConfigLoader {
  public URI: string;
  public DB_NAME: string;
  public PROTOCOL: string;
  public USER: string;
  public PASSWORD: string;
  public HOST: string;
  public OPTIONS: string | undefined;

  constructor(overrides: MongoConfigOverrides = {}) {
    this.PROTOCOL = overrides.PROTOCOL ?? process.env.MONGODB_PROTOCOL;
    this.USER = overrides.USER ?? process.env.MONGODB_USER;
    this.PASSWORD = overrides.PASSWORD ?? process.env.MONGODB_PASSWORD;
    this.HOST = overrides.HOST ?? process.env.MONGODB_HOST;
    this.DB_NAME = overrides.DB_NAME ?? process.env.MONGODB_DB_NAME;
    this.OPTIONS = overrides.OPTIONS ?? process.env.MONGODB_OPTIONS;

    this.URI = MongoConfigLoader.buildConnectionString({
      protocol: this.PROTOCOL,
      user: this.USER,
      password: this.PASSWORD,
      host: this.HOST,
      dbName: this.DB_NAME,
      options: this.OPTIONS,
    });
  }

  static buildConnectionString({ protocol, user, password, host, dbName, options }: {
    protocol: string;
    user: string;
    password: string;
    host: string;
    dbName: string;
    options?: string;
  }): string {
    const sanitizedOptions = options?.replace(/useNewUrlParser|useUnifiedTopology/g, '') || '';
    return `${protocol}://${user}:${password}@${host}/${dbName}?${sanitizedOptions}`;
  }
}