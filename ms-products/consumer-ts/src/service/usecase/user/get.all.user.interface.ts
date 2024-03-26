import { UserUpdateDto } from 'src/data/dto/user.dto';

export interface GetAllUser {
  getAll(skip: number, take: number): Promise<UserUpdateDto[]>;
}
