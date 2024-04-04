import { Injectable, Logger } from '@nestjs/common';
import { EventDto } from 'src/data/dto/event.dto';
import { UserUpdateDto } from 'src/data/dto/user.dto';
import { UserRepositoryImpl } from 'src/data/repository/local/impl/user.repository.impl';
import { UserContex } from '../user.contex.interface';

@Injectable()
export class UpdateUserService implements UserContex {
  private readonly logger: Logger;
  constructor(private readonly userRepository: UserRepositoryImpl) {
    this.logger = new Logger(UpdateUserService.name);
  }

  accept(event: EventDto<UserUpdateDto>): void {
    this.userRepository.update(event.messages);
    event.messages.password = '';
    this.logger.log(event);
  }
}
