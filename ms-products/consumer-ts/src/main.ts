import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { KAFKA_CONNECT_MICROSERVICE } from './config/kafka.options';
import { configPipe } from './config/validation.config.pipe';
import { ConfigFieldNameEnv } from './data/dto/config.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get(ConfigFieldNameEnv.PATH_PREFIX));
  app.use(morgan('dev'));
  app.useGlobalPipes(configPipe);
  app.connectMicroservice(KAFKA_CONNECT_MICROSERVICE);
  app.startAllMicroservices();
  await app.listen(configService.get(ConfigFieldNameEnv.PORT_APP));
}
bootstrap();
