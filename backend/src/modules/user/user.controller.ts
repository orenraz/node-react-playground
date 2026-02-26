import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userService.create(createUserDto);
    return {
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      gender: newUser.gender,
      age: newUser.age || createUserDto.age,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    console.log(`Received request body:`, updateUserDto); // Log the entire request body
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

type User = {
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
};