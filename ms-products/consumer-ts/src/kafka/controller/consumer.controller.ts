import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  KafkaRetriableException,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { EventDto } from 'src/data/dto/event.dto';
import { KafkaEnum } from 'src/data/dto/kafka.enum';
import { UserContexService } from 'src/service/usecase/user/impl/user.contex.service';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly userContexService: UserContexService) {}

  @MessagePattern(KafkaEnum.topicName)
  userEvent(
    @Payload() event: EventDto<any>,
    @Ctx() context: KafkaContext,
  ): void {
    try {
      this.userContexService.accept(event);
    } catch (error) {
      throw new KafkaRetriableException(error);
    }
  }
}
