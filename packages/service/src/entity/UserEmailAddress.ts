import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
