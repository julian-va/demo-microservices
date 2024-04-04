import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserCreateDto, UserUpdateDto } from 'src/data/dto/user.dto';
import { UserEntity } from 'src/data/entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly CERO: number = 0;
  private readonly SALT_OR_ROUNDS: number = 10;
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  getAll(skip: number, take: number): Promise<UserEntity[]> {
    try {
      return this.repository.find({ skip: skip, take: take });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.FAILED_DEPENDENCY);
    }
  }

  getById(id: number): Promise<UserEntity> {
    try {
      return this.repository.findOneBy({ id: id });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.FAILED_DEPENDENCY);
    }
  }

  async create(dto: UserCreateDto): Promise<UserEntity> {
    try {
      dto.password = await this.hashPassword(dto.password);
      const newEntity = this.repository.create(dto);
      return this.repository.save(newEntity);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.FAILED_DEPENDENCY);
    }
  }

  async update(dto: UserUpdateDto): Promise<UserEntity> {
    if (!dto || !dto.id) {
      return;
    }
    try {
      const entity = await this.getById(dto.id);
      if (entity) {
        dto.password =
          dto.password.trim().length === this.CERO
            ? entity.password
            : await this.hashPassword(dto.password);

        this.repository.merge(entity, dto);
        return this.repository.save(entity);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.FAILED_DEPENDENCY);
    }
  }

  delete(id: number): void {
    try {
      if (id) {
        this.repository.delete(id);
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.FAILED_DEPENDENCY);
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_OR_ROUNDS);
  }
}
