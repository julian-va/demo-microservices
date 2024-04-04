import { EventDto } from 'src/data/dto/event.dto';

export interface OrchestratorRepository {
  SendMessageDeadLetterQueue<T>(event: EventDto<T>): Promise<void>;
}
