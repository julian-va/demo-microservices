import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'creation_date',
  })
  creationDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
  })
  updateDate: Date;
}
