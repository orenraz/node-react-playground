import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { Gender } from '@src/modules/user/enums/gender.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum(['male', 'female', 'other'])
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  birthDate?: string; // ISO date string
    
}
