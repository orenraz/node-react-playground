
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { mapCreateUserToEntity, mapUpdateUserToEntity } from './utils/user-mapper';
import { hashPassword } from '@src/utils/password';
import { DuplicateUserError } from './errors/duplicate-user.error';
import { UserNotFoundError } from './errors/user-not-found.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      let dtoToMap = createUserDto;
      // Only hash password for local users (provider missing or 'local') and if password exists
      if ((!createUserDto.provider || createUserDto.provider === 'local') && createUserDto.password) {
        dtoToMap = { ...createUserDto, password: await hashPassword(createUserDto.password) };
      }
      const userToCreate = mapCreateUserToEntity(dtoToMap);
      return await this.userRepository.create(userToCreate);
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof DuplicateUserError) {
        throw new ConflictException(error.message);
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Failed to create user: Unknown error');
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


  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Accepts only updatable fields defined in UpdateUserDto

    const userToUpdate = mapUpdateUserToEntity(updateUserDto);
    console.log(`Querying user with userId: ${userId}`);
    console.log(`Update payload:`, userToUpdate);
    try {
      const updatedUser = await this.userRepository.updateByUserId(userId, userToUpdate);
      console.log(`User updated successfully:`, updatedUser);
      if (!updatedUser) {
        throw new NotFoundException(`User with userId ${userId} not found`);
      }
      return updatedUser;
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Failed to update user: Unknown error');
    }
  }

  async delete(userId: string): Promise<User> {
    try {
      const deletedUser = await this.userRepository.deleteByUserId(userId);
      return deletedUser;
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Failed to delete user: Unknown error');
    }
  }
}