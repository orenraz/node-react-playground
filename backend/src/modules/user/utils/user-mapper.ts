import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { parseIsoDate } from '@src/utils/date';

export function mapCreateUserToEntity(dto: CreateUserDto): Partial<User> {
  const { password, ...rest } = dto;
  return {
    ...rest,
    userId: uuidv4(),
    birthDate: dto.birthDate ? parseIsoDate(dto.birthDate) : undefined,
    ...(password && { password }),
  };
}

export function mapUpdateUserToEntity(dto: UpdateUserDto): Partial<User> {
  const { password, ...rest } = dto;
  return {
    ...rest,
    birthDate:
      typeof dto.birthDate === 'string'
        ? parseIsoDate(dto.birthDate)
        : (dto.birthDate as Date | undefined),
    ...(password && { password }),
  };
}
