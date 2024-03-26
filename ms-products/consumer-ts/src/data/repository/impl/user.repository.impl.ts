import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto, UserUpdateDto } from 'src/data/dto/user.dto';
import { UserEntity } from 'src/data/entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  getAll(skip: number, take: number): Promise<UserEntity[]> {
    return this.repository.find({ skip: skip, take: take });
  }

  getById(id: number): Promise<UserEntity> {
    return this.repository.findOneBy({ id: id });
  }
  create(dto: UserCreateDto): Promise<UserEntity> {
    const newEntity = this.repository.create(dto);
    return this.repository.save(newEntity);
  }

  async update(dto: UserUpdateDto): Promise<UserEntity> {
    const entity = await this.getById(dto.id);
    this.repository.merge(entity, dto);
    return this.repository.save(entity);
  }
  delete(id: number): void {
    this.repository.delete(id);
  }
}
