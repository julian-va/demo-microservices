import { UserCreateDto, UserUpdateDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

export interface UserRepository {
  getAll(skip: number, take: number): Promise<UserEntity[]>;
  getById(id: number): Promise<UserEntity>;
  create(dto: UserCreateDto): Promise<UserEntity>;
  update(dto: UserUpdateDto): Promise<UserEntity>;
  delete(id: number): void;
}
