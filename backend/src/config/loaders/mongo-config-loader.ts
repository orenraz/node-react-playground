
export class MongoConfigLoader {
  public URI: string;
  public DB_NAME: string;
  public PROTOCOL: string;
  public USER: string;
  public PASSWORD: string;
  public HOST: string;
  public OPTIONS: string | undefined;

  constructor() {
    this.PROTOCOL = process.env.MONGODB_PROTOCOL;
    this.USER = process.env.MONGODB_USER;
    this.PASSWORD = process.env.MONGODB_PASSWORD;
    this.HOST = process.env.MONGODB_HOST;
    this.DB_NAME = process.env.MONGODB_DB_NAME;
    this.OPTIONS = process.env.MONGODB_OPTIONS;

    this.URI = MongoConfigLoader.buildConnectionString({
      protocol: this.PROTOCOL,
      user: this.USER,
      password: this.PASSWORD,
      host: this.HOST,
      dbName: this.DB_NAME,
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