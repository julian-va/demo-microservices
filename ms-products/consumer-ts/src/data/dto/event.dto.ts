import { EventType } from './event.typr.enum';

export class EventDto<T> {
  eventId: String;
  topicName: String;
  date: Date;
  type: EventType;
  messages: T;
}
