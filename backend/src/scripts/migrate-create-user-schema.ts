import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

class UserMigrationService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async createUserSchema() {
    console.log('Creating user schema...');

    const userSchema = new mongoose.Schema({
      userId: { type: String, required: true, unique: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      gender: { type: String, required: true },
      age: { type: Number, required: true },
    });

    const UserModel = this.connection.model('users', userSchema);

    console.log('User schema created successfully.');
    return UserModel;
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const connection = app.get(Connection);
  const userMigrationService = new UserMigrationService(connection);

  await userMigrationService.createUserSchema();

  console.log('Migration completed.');
  await app.close();
}

bootstrap().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});