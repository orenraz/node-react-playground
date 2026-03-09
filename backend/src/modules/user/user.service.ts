import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 11000) {
        throw new Error('Duplicate userId detected');
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    console.log('Querying user with _id:', id);
    const user = await this.userRepository.findById(id);
    console.log('Query result:', user);
    return user;
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    console.log(`Querying user with _id: ${id}`);
    console.log(`Update payload:`, updateUserDto);
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      console.error(`User with _id: ${id} not found`);
      throw new Error(`User with id ${id} not found`);
    }
    console.log(`User updated successfully:`, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    return this.userRepository.delete(id);
  }
}