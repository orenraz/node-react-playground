import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GreetDto } from './dto/greet.dto';
import { GreetService } from './greet.service';
import { UpdateGreetDto } from './dto/update-greet.dto';
import { CreateGreetDto } from './dto/create-greet.dto';
import { Greet } from './greet.service';

@Controller('greet')
export class GreetController {
  constructor(private readonly greetService: GreetService) {}

  @Post()
  create(@Body() createGreetDto: CreateGreetDto) {
    const greeting = this.greetService.create(createGreetDto);
    return { id: greeting.id, name: greeting.name, message: greeting.message };
  }

  @Get()
  findAll() {
    return this.greetService.findAllGreetings();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const greeting = await this.greetService.findGreetingById(id);
    return { id: greeting.id, name: greeting.name, message: greeting.message };
  }

  @Patch(':id')
  async update(id: string, updateGreetDto: UpdateGreetDto): Promise<Greet> {
    const updatedGreet = await this.greetService.updateGreeting(id, updateGreetDto);
    return {
      id,
      name: 'Test',
      message: updateGreetDto.message || 'Updated Message',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const deletedGreeting = this.greetService.findGreetingById(id);
    this.greetService.deleteGreeting(id);
    return { id, ...deletedGreeting };
  }
}
