
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userToCreate = {
        ...createUserDto,
        userId: uuidv4(),
      };
      return await this.userRepository.create(userToCreate);
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


  async findOne(userId: string): Promise<User> {
    console.log('Querying user with userId:', userId);
    const user = await this.userRepository.findByUserId(userId);
    console.log('Query result:', user);

    if (!user) {
      throw new NotFoundException(`User with userId ${userId} not found`);
    }
    return user;
  }


  async update(userId: string, updateUserDto: Partial<User>): Promise<User> {
    console.log(`Querying user with userId: ${userId}`);
    console.log(`Update payload:`, updateUserDto);
    const updatedUser = await this.userRepository.updateByUserId(userId, updateUserDto);
    if (!updatedUser) {
      console.error(`User with userId: ${userId} not found`);
      throw new Error(`User with userId ${userId} not found`);
    }
    console.log(`User updated successfully:`, updatedUser);
    return updatedUser;
  }

  async delete(userId: string): Promise<User> {
    return this.userRepository.deleteByUserId(userId);
  }
}