import { INestApplication } from '@nestjs/common';
import { UserService } from '@src/modules/user/user.service';
import { CreateUserDto } from '@src/modules/user/dto/create-user.dto';
import { BaseUserTestIUtils } from '@test/common/user/baseUserTestUtils';

export class E2EUserTestUtils extends BaseUserTestIUtils {
  async createUser(app: INestApplication, overrides: Partial<CreateUserDto> = {}) {
    const userService = app.get(UserService);
    const mockUserData = this.generateUserData(overrides);
    const createdUser = await userService.create(mockUserData);
    return { createdUser, mockUserData };
  }

  async deleteUser(app: INestApplication, userId: string) {
    const userService = app.get(UserService);
    return await userService.delete(userId);
  }
}
