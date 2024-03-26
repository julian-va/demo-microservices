import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaEnum } from 'src/data/dto/kafka.enum';
import { ServiceModule } from 'src/service/service.module';
import { ConsumerController } from './controller/consumer.controller';
import { ProducerController } from './controller/producer.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KafkaEnum.clientNameKafka,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: KafkaEnum.clientId,
            brokers: [KafkaEnum.brokers],
          },
          consumer: {
            groupId: KafkaEnum.groupId,
          },
        },
      },
    ]),
    ServiceModule,
  ],
  controllers: [ProducerController, ConsumerController],
})
export class KafkaModule {}
