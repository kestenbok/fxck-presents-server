import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<T> {
  constructor(partial?: Partial<T>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('identity')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
