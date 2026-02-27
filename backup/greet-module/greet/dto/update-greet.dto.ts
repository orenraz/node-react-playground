import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateGreetDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsString()
  @MinLength(1)
  message: string;
}