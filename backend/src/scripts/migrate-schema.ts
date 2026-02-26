import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

class MigrationService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async initializeSchemas() {
    console.log('Initializing schemas...');

    // Example: Create collections or indexes
    const collections = await this.connection.db.listCollections().toArray();
    console.log('Existing collections:', collections.map(c => c.name));

    // Add schema initialization logic here
    console.log('Schema initialization completed.');
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const connection = app.get(Connection);
  const migrationService = new MigrationService(connection);

  await migrationService.initializeSchemas();

  console.log('Migration completed.');
  await app.close();
}

bootstrap().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});