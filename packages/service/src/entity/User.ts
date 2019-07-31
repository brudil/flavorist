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
import { Recipe } from './Recipe';
import { InventoryItem } from './InventoryItem';
import { Batch } from './Batch';
import { DiscussionComment } from './Discussion';
import { UserEmailAddress } from './UserEmailAddress';

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

  @OneToMany(() => UserEmailAddress, (emailAddress) => emailAddress.user)
  emailAddresses: UserEmailAddress[];

  @OneToMany(() => InventoryItem, (item) => item.user)
  inventory: InventoryItem[];

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

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
  public async findByEmailAdderss(emailAddress: string) {
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
  //
  // public async createUser(emailAddress: string, password: string) {
  //   const emailAddressRepo = getRepository(UserEmailAddress);
  //
  //
  // }
}
