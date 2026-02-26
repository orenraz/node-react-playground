import { IsString, MinLength } from 'class-validator';

export class GreetDto {
  @IsString()
  @MinLength(1)
  message: string;
}