import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'reflect-metadata';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule, // Import DatabaseModule to provide DatabaseService
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository, MongooseModule], // Export UserService, UserRepository, and MongooseModule
})
export class UserModule {}