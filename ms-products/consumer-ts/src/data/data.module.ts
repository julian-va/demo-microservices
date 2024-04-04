import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepositoryImpl } from './repository/local/impl/user.repository.impl';
import { OrchestratorRepositoryImpl } from './repository/remote/impl/orchestrator.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  providers: [UserRepositoryImpl, OrchestratorRepositoryImpl],
  exports: [UserRepositoryImpl, OrchestratorRepositoryImpl],
})
export class DataModule {}
