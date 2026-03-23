import { IsString, IsNotEmpty, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Gender } from '@src/modules/user/enums/gender.enum';


export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;
}