import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { RequirePasswordForLocal } from '@src/common/validators/require-password-for-local.validator';
import { RequireGoogleIdForGoogle } from '@src/common/validators/require-googleid-for-google.validator';
import { Gender } from '@src/modules/user/enums/gender.enum';


export class CreateUserDto {
  @IsString()
  @IsOptional()
  @RequirePasswordForLocal({ message: 'Password is required for local users.' })
  password?: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @RequireGoogleIdForGoogle({ message: 'googleId is required when provider is google.' })
  googleId?: string;

  @IsString()
  provider?: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsOptional()
  birthDate?: string;
}