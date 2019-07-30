import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './User';

enum EmailAddressStatus {
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED',
}

@Unique(['emailAddress'])
@Entity()
export class UserEmailAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.emailAddresses)
  user: User;

  @Column()
  emailAddress: string;

  @Column({
    type: 'enum',
    enum: EmailAddressStatus,
    default: EmailAddressStatus.Unverified,
  })
  status: EmailAddressStatus;
}
