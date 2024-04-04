import { Injectable, Logger } from '@nestjs/common';
import { EventDto } from 'src/data/dto/event.dto';
import { EventType } from 'src/data/dto/event.typr.enum';
import { OrchestratorRepositoryImpl } from 'src/data/repository/remote/impl/orchestrator.repository.impl';
import { UserContex } from '../user.contex.interface';
import { CreateUserService } from './create.user.service';
import { DeleteUserService } from './delete.user.service';
import { UpdateUserService } from './update.user.service';

@Injectable()
export class UserContexService implements UserContex {
  private static ERROR_API: string =
    'an error occurred consuming the message : ';
  private readonly strategy: Map<EventType, UserContex>;
  private readonly logger: Logger;
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly orchestratorRepositoryImpl: OrchestratorRepositoryImpl,
  ) {
    this.strategy = this.createMApStrategy();
    this.logger = new Logger(UpdateUserService.name);
  }

  accept(event: EventDto<any>): void {
    try {
      const useCase: UserContex = this.strategy.get(event.type);
      useCase.accept(event);
    } catch (error) {
      this.orchestratorRepositoryImpl.SendMessageDeadLetterQueue<any>(event);
      this.logger.error(
        `${UserContexService.ERROR_API}${event}`,
        error.message,
      );
    }
  }

  private createMApStrategy(): Map<EventType, UserContex> {
    return new Map<EventType, UserContex>([
      [EventType.CREATE, this.createUserService],
      [EventType.UPDATE, this.updateUserService],
      [EventType.DELETE, this.deleteUserService],
    ]);
  }
}
