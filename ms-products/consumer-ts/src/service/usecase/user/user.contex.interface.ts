import { EventDto } from 'src/data/dto/event.dto';

export interface UserContex {
  accept(event: EventDto<any>): void;
}
