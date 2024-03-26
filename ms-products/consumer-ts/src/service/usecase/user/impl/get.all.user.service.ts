import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from 'src/data/dto/user.dto';
import { UserRepositoryImpl } from 'src/data/repository/impl/user.repository.impl';
import { GetAllUser } from '../get.all.user.interface';

@Injectable()
export class GetAllUserService implements GetAllUser {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  getAll(skip: number, take: number): Promise<UserUpdateDto[]> {
    return this.userRepository.getAll(skip, take);
  }
}
