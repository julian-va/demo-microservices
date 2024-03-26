import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from 'src/data/data.module';
import { UserEntity } from 'src/data/entity/user.entity';
import { CreateUserService } from './usecase/user/impl/create.user.service';
import { DeleteUserService } from './usecase/user/impl/delete.user.service';
import { GetAllUserService } from './usecase/user/impl/get.all.user.service';
import { UpdateUserService } from './usecase/user/impl/update.user.service';
import { UserContexService } from './usecase/user/impl/user.contex.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DataModule],
  providers: [
    UserContexService,
    GetAllUserService,
    UpdateUserService,
    CreateUserService,
    DeleteUserService,
  ],
  exports: [
    UserContexService,
    GetAllUserService,
    UpdateUserService,
    CreateUserService,
    DeleteUserService,
  ],
})
export class ServiceModule {}
