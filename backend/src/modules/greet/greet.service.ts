import { Injectable, NotFoundException } from '@nestjs/common';
import { GreetDto } from './dto/greet.dto';
import { CreateGreetDto } from './dto/create-greet.dto';

export type Greet = {
  id: string;
  name: string;
  message: string;
};

@Injectable()
export class GreetService {
  private greetings: Greet[] = [];

  create(greetDto: GreetDto) {
    const newGreeting: Greet = {
      id: (this.greetings.length + 1).toString(),
      name: greetDto.message,
      message: `Hello, ${greetDto.message}!`,
    };
    this.greetings.push(newGreeting);
    return newGreeting;
  }

  createGreeting(createGreetDto: CreateGreetDto): Greet {
    const newGreet = {
      id: this.generateId(),
      name: createGreetDto.name,
      message: `Hello, ${createGreetDto.name}!`,
    };
    this.greetings.push(newGreet);
    return newGreet;
  }

  findAllGreetings() {
    return this.greetings;
  }

  async findGreetingById(id: string): Promise<Greet> {
    const greeting = this.greetings.find((g) => g.id === id);
    if (!greeting) {
      throw new NotFoundException(`Greeting with ID ${id} not found`);
    }
    return greeting;
  }

  async findOne(id: string): Promise<Greet> {
    const greet = this.greetings.find((g) => g.id === id);
    if (!greet) {
      throw new NotFoundException(`Greeting with ID ${id} not found`);
    }
    return greet;
  }

  updateGreeting(id: string, updateData: Partial<Greet>) {
    const greeting = this.findGreetingById(id);
    Object.assign(greeting, updateData);
    return greeting;
  }

  deleteGreeting(id: string) {
    const index = this.greetings.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new NotFoundException(`Greeting with ID ${id} not found`);
    }
    return this.greetings.splice(index, 1);
  }

  clearGreetings(): void {
    this.greetings = [];
  }

  private generateId(): string {
    return (this.greetings.length + 1).toString();
  }
}
