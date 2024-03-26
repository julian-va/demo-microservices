import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const PostgresDataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  //host: 'localhost',
  host: 'postgres_service',
  port: 5432,
  username: 'user_test',
  password: 'password_test',
  database: 'test_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  retryDelay: 3000,
  retryAttempts: 10,
  poolSize: 2,
};
