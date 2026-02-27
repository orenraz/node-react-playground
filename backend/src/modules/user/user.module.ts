import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'reflect-metadata';
import { User, UserSchema } from '../database/schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule, // Import DatabaseModule to provide DatabaseService
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule], // Export UserService and MongooseModule
})
export class UserModule {}