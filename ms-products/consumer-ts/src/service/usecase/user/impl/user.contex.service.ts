import { Injectable } from '@nestjs/common';
import { EventDto } from 'src/data/dto/event.dto';
import { EventType } from 'src/data/dto/event.typr.enum';
import { UserContex } from '../user.contex.interface';
import { CreateUserService } from './create.user.service';
import { DeleteUserService } from './delete.user.service';
import { UpdateUserService } from './update.user.service';

@Injectable()
export class UserContexService implements UserContex {
  private readonly strategy: Map<EventType, UserContex>;
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {
    this.strategy = this.createMApStrategy();
  }

  accept(event: EventDto<any>): void {
    const useCase: UserContex = this.strategy.get(event.type);
    useCase.accept(event);
  }

  private createMApStrategy(): Map<EventType, UserContex> {
    return new Map<EventType, UserContex>([
      [EventType.CREATE, this.createUserService],
      [EventType.UPDATE, this.updateUserService],
      [EventType.DELETE, this.deleteUserService],
    ]);
  }
}
