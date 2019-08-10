import {
  Column,
  CreateDateColumn,
  Entity,
  EntityRepository,
  getRepository,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { DiscussionComment } from './Discussion';
import { UserEmailAddress } from './UserEmailAddress';
import { Namespace } from './Namespace';
import { Batch } from './Batch';
import { TeamMembership } from './TeamMembership';

@Unique(['username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  passwordHash: string;

  @OneToOne(() => UserEmailAddress, { nullable: true })
  @JoinColumn()
  primaryEmailAddress: UserEmailAddress;

  @OneToMany(() => TeamMembership, (membership) => membership.team)
  teamMemberships!: TeamMembership[];

  @OneToOne(() => Namespace, (namespace) => namespace.user)
  @JoinColumn()
  namespace: Namespace;

  @OneToMany(() => UserEmailAddress, (emailAddress) => emailAddress.user)
  emailAddresses: UserEmailAddress[];

  @OneToMany(() => Batch, (batch) => batch.user)
  batches: Batch[];

  @OneToMany(() => DiscussionComment, (comment) => comment.user)
  comments: DiscussionComment[];

  @Column({ default: 0 })
  reputation: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public async authenticate(password: string): Promise<boolean> {
    try {
      return await argon2.verify(this.passwordHash, password);
    } catch (e) {
      return false;
    }
  }

  public async setPassword(password: string) {
    this.passwordHash = await argon2.hash(password);
  }

  public generateToken() {
    return jwt.sign({ userId: this.id }, 'Sacrat', { expiresIn: '1d' });
  }
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByEmailAddress(emailAddress: string) {
    const emailAddressRepo = getRepository(UserEmailAddress);
    const emailAddressEntry = await emailAddressRepo.findOne(
      { emailAddress },
      { relations: ['user'] },
    );

    try {
      return emailAddressEntry && emailAddressEntry.user;
    } catch {
      return null;
    }
  }

  public async findByUsername(username: string) {
    return await this.findOne({ username });
  }
  //
  // public async createUser(emailAddress: string, password: string) {
  //   const emailAddressRepo = getRepository(UserEmailAddress);
  //
  //
  // }
}
