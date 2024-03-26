import { Transport } from '@nestjs/microservices';
import { KafkaEnum } from 'src/data/dto/kafka.enum';

export const KAFKA_CONNECT_MICROSERVICE = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: KafkaEnum.clientId,
      brokers: [KafkaEnum.brokers],
    },
  },
};
