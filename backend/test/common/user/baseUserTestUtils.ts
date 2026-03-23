import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '@src/modules/user/dto/create-user.dto';
import { Gender } from '@src/modules/user/enums/gender.enum';  

/**
 * Generates a CreateUserDto object with random/default values unless overridden.
 * @param overrides - Partial user data to override defaults
 * @returns Complete CreateUserDto
 */
export class BaseUserTestIUtils {
  generateUserData(overrides: Partial<CreateUserDto> = {}): CreateUserDto {
    const uuid = uuidv4();
    const genderValues = Object.values(Gender);
    const randomGender = genderValues[Math.floor(Math.random() * genderValues.length)];
    const randomAge = Math.floor(Math.random() * 121); // 0-120 inclusive

    // userId is not part of CreateUserDto anymore
    const { /* userId, */ ...rest } = overrides;
    return {
      firstName: rest.firstName ?? `First_Name_${uuid}`,
      lastName: rest.lastName ?? `Last_Name_${uuid}`,
      gender: rest.gender ?? randomGender,
      age: rest.age ?? randomAge,
    };
  }
}
