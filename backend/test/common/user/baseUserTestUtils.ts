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
    // Only assign gender/birthDate if provided or randomly if not explicitly set to undefined
    const gender = overrides.hasOwnProperty('gender') ? overrides.gender : genderValues[Math.floor(Math.random() * genderValues.length)];
    const birthDate = overrides.hasOwnProperty('birthDate') ? overrides.birthDate : new Date(Date.now() - Math.floor(Math.random() * 100 * 365 * 24 * 60 * 60 * 1000)).toISOString();
    return {
      email: overrides.email ?? `user_${uuid}@example.com`,
      googleId: overrides.googleId,
      provider: overrides.provider,
      firstName: overrides.firstName ?? `First_Name_${uuid}`,
      lastName: overrides.lastName ?? `Last_Name_${uuid}`,
      ...(gender !== undefined ? { gender } : {}),
      ...(birthDate !== undefined ? { birthDate } : {}),
      ...(overrides.password && { password: overrides.password }),
    };
  }
}
