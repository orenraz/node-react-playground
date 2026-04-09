import { toIsoDateString } from '@src/utils/date';

export class UserResponseDto {
  userId!: string;
  email!: string;
  googleId?: string;
  provider?: string;
  firstName!: string;
  lastName!: string;
  gender!: import('../enums/gender.enum').Gender;
  birthDate!: string; // ISO string

  constructor(user: any) {
    this.userId = user.userId;
    this.email = user.email;
    this.googleId = user.googleId;
    this.provider = user.provider;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.gender = user.gender;
    this.birthDate = toIsoDateString(user.birthDate);
  }
}
