import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/config';
import { PostgresDataSource } from './config/dataSource';
import { ControllerModule } from './controller/controller.module';
import { DataModule } from './data/data.module';
import { KafkaModule } from './kafka/kafka.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot(Config),
    TypeOrmModule.forRoot(PostgresDataSource),
    KafkaModule,
    DataModule,
    ServiceModule,
    ControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
