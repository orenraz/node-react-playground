import { UserService } from '@src/modules/user/user.service';
import { CreateUserDto } from '@src/modules/user/dto/create-user.dto';

/**
 * Helper to create a user using a UserService mock (unit test context)
 * @param service - UserService mock
 * @param userData - user DTO
 * @returns created user (Promise)
 */
export async function createUserUnit(service: UserService, userData: CreateUserDto) {
  return await service.create(userData);
}

/**
 * Helper to delete a user using a UserService mock (unit test context)
 * @param service - UserService mock
 * @param userId - userId to delete
 * @returns deleted user (Promise)
 */
export async function deleteUserUnit(service: UserService, userId: string) {
  return await service.delete(userId);
}
