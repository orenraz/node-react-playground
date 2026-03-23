import { UserService } from '@src/modules/user/user.service';
import { CreateUserDto } from '@src/modules/user/dto/create-user.dto';
import { BaseUserTestIUtils } from '@test/common/user/baseUserTestUtils';


export class UnitUserTestUtils extends BaseUserTestIUtils {

  /**
 * Helper to create a user using a UserService mock (unit test context)
 * @param service - UserService mock
 * @param userData - user DTO
 * @returns created user (Promise)
 */
  async createUser(service: UserService, overrides: Partial<CreateUserDto> = {}) {
    const userData = this.generateUserData(overrides);
    return await service.create(userData);
  }

  /**
 * Helper to delete a user using a UserService mock (unit test context)
 * @param service - UserService mock
 * @param userId - userId to delete
 * @returns deleted user (Promise)
 */
  async deleteUser(service: UserService, userId: string) {
    return await service.delete(userId);
  }
}
