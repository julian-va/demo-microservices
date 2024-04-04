import { Injectable, Logger } from '@nestjs/common';
import { EventDto } from 'src/data/dto/event.dto';
import { UserUpdateDto } from 'src/data/dto/user.dto';
import { UserRepositoryImpl } from 'src/data/repository/local/impl/user.repository.impl';
import { UserContex } from '../user.contex.interface';

@Injectable()
export class DeleteUserService implements UserContex {
  private readonly logger: Logger;
  constructor(private readonly userRepository: UserRepositoryImpl) {
    this.logger = new Logger(DeleteUserService.name);
  }

  accept(event: EventDto<UserUpdateDto>): void {
    this.userRepository.delete(event.messages.id);
    event.messages.password = '';
    this.logger.log(event);
  }
}
