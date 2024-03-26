import { Injectable } from '@nestjs/common';
import { EventDto } from 'src/data/dto/event.dto';
import { UserUpdateDto } from 'src/data/dto/user.dto';
import { UserRepositoryImpl } from 'src/data/repository/impl/user.repository.impl';
import { UserContex } from '../user.contex.interface';

@Injectable()
export class DeleteUserService implements UserContex {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  accept(event: EventDto<UserUpdateDto>): void {
    this.userRepository.delete(event.messages.id);
  }
}
