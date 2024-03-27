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
    try {
      return this.repository.find({ skip: skip, take: take });
    } catch (error) {
      console.error(error);
    }
  }

  getById(id: number): Promise<UserEntity> {
    try {
      return this.repository.findOneBy({ id: id });
    } catch (error) {
      console.error(error);
    }
  }

  create(dto: UserCreateDto): Promise<UserEntity> {
    try {
      const newEntity = this.repository.create(dto);
      return this.repository.save(newEntity);
    } catch (error) {
      console.error(error);
    }
  }

  async update(dto: UserUpdateDto): Promise<UserEntity> {
    if (!dto || !dto.id) {
      return;
    }
    try {
      const entity = await this.getById(dto.id);
      if (entity) {
        this.repository.merge(entity, dto);
        return this.repository.save(entity);
      }
    } catch (error) {
      console.error(error);
    }
  }

  delete(id: number): void {
    try {
      if (id) {
        this.repository.delete(id);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
