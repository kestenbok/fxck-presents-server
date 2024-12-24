import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from 'src/core/database/entity/base.entity';

@Entity()
export class Friendship extends BaseEntity<Friendship> {
  @ManyToOne(() => User, (user) => user.friends)
  userA: User;

  @ManyToOne(() => User, (user) => user.friends)
  userB: User;
}
