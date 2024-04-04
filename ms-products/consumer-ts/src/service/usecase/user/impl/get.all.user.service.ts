import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from 'src/data/dto/user.dto';
import { UserRepositoryImpl } from 'src/data/repository/local/impl/user.repository.impl';
import { GetAllUser } from '../get.all.user.interface';

@Injectable()
export class GetAllUserService implements GetAllUser {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  async getAll(skip: number, take: number): Promise<UserUpdateDto[]> {
    const users = await this.userRepository.getAll(skip, take);
    return users.map((user) => {
      let userDto = new UserUpdateDto();
      userDto.creationDate = user.creationDate;
      userDto.updateDate = user.updateDate;
      userDto.email = user.email;
      userDto.id = user.id;
      userDto.name = user.name;
      userDto.role = user.role;
      return userDto;
    });
  }
}
