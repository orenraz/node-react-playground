import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }


  @Put(':userId')
  update(@Param('userId') userId: string, @Body() updateUserDto: any) {
    console.log(`Received request body:`, updateUserDto); // Log the entire request body
    return this.userService.update(userId, updateUserDto);
  }


  @Delete(':userId')
  delete(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}

type User = {
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
};