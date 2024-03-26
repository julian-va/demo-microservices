import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSource } from './config/dataSource';
import { ControllerModule } from './controller/controller.module';
import { DataModule } from './data/data.module';
import { KafkaModule } from './kafka/kafka.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
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
