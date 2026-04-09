import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser = await this.userService.create(createUserDto);
    return new UserResponseDto(newUser);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map(user => new UserResponseDto(user));
  }


  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<UserResponseDto> {
    const user = await this.userService.findOne(userId);
    return new UserResponseDto(user);
  }


  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userService.update(userId, updateUserDto);
    return new UserResponseDto(updatedUser);
  }


  @Delete(':userId')
  async delete(@Param('userId') userId: string): Promise<UserResponseDto> {
    const deletedUser = await this.userService.delete(userId);
    return new UserResponseDto(deletedUser);
  }
}

type User = {
  userId: string;
  email: string;
  googleId?: string;
  provider?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
};