import { Injectable, Logger } from '@nestjs/common';
import { EventDto } from 'src/data/dto/event.dto';
import { UserCreateDto } from 'src/data/dto/user.dto';
import { UserRepositoryImpl } from 'src/data/repository/local/impl/user.repository.impl';
import { UserContex } from '../user.contex.interface';

@Injectable()
export class CreateUserService implements UserContex {
  private readonly logger: Logger;
  constructor(private readonly userRepository: UserRepositoryImpl) {
    this.logger = new Logger(CreateUserService.name);
  }

  accept(event: EventDto<UserCreateDto>): void {
    this.userRepository.create(event.messages);
    event.messages.password = '';
    this.logger.log(event);
  }
}
