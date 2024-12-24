import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from 'src/core/database/entity/base.entity';

@Entity()
export class FriendshipRequest extends BaseEntity<FriendshipRequest> {
  @ManyToOne(() => User, (user) => user.friends)
  recipient: User;

  @ManyToOne(() => User, (user) => user.friends)
  sender: User;
}
