import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepositoryImpl } from './repository/impl/user.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepositoryImpl],
  exports: [UserRepositoryImpl],
})
export class DataModule {}
