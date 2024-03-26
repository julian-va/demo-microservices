import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KAFKA_CONNECT_MICROSERVICE } from './config/kafka.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(KAFKA_CONNECT_MICROSERVICE);
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
