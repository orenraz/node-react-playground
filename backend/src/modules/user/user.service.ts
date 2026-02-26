import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      const savedUser = await newUser.save();
      return savedUser.toObject({ getters: true }); // Ensure _id is included in the returned object
    } catch (error) {
      console.error('Error creating user:', error); // Log the full error stack
      if (error.code === 11000) {
        throw new Error('Duplicate userId detected'); // Handle duplicate key error
      }
      throw new Error(`Failed to create user: ${error.message}`); // Log other errors
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    console.log('Querying user with _id:', id);
    const user = await this.userModel.findById(id).exec();
    console.log('Query result:', user);
    return user.toObject({ getters: true }); // Ensure _id is included in the returned object
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    console.log(`Querying user with _id: ${id}`); // Log the _id being queried
    console.log(`Update payload:`, updateUserDto); // Log the update payload

    const result = await this.userModel
      .updateOne({ _id: id }, { $set: updateUserDto })
      .exec();

    console.log(`MongoDB update result:`, result); // Log the MongoDB update result

    const updatedUser = await this.userModel.findById(id).exec(); // Fetch the updated user

    if (!updatedUser) {
      console.error(`User with _id: ${id} not found`); // Log if the user is not found
      throw new Error(`User with id ${id} not found`); // Throw an error for missing user
    }

    console.log(`User updated successfully:`, updatedUser); // Log the updated user
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}