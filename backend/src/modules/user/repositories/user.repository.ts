import { Injectable } from '@nestjs/common';
import { DuplicateUserError } from '../errors/duplicate-user.error';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


  async create(user: Partial<User>): Promise<User> {
    // Accepts email, googleId, provider, and other fields
    if (!user.email) throw new Error('Email is required');
    try {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (err: any) {
      if (err && err.code === 11000) {
        throw new DuplicateUserError('Duplicate user detected');
      }
      throw err;
    }
  }


  async findByUserId(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }).exec();
  }

  async updateByUserId(userId: string, user: Partial<User>): Promise<User> {
    // Accepts partial updates; email is not required
    try {
      const updated = await this.userModel.findOneAndUpdate({ userId }, user, { new: true }).exec();
      if (!updated) {
        throw new UserNotFoundError(`User with userId ${userId} not found`);
      }
      return updated;
    } catch (err: any) {
      if (err && err.code === 11000) {
        throw new DuplicateUserError('Duplicate user detected');
      }
      throw err;
    }
  }

  async deleteByUserId(userId: string): Promise<User> {
    try {
      const deleted = await this.userModel.findOneAndDelete({ userId }).exec();
      if (!deleted) {
        throw new UserNotFoundError(`User with userId ${userId} not found`);
      }
      return deleted;
    } catch (err: any) {
      throw err;
    }
  }
}
