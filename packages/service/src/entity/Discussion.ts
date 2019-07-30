import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DiscussionComment, (comment) => comment.discussion)
  comments: DiscussionComment[];
}

@Entity()
export class DiscussionComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Discussion, (discussion) => discussion.comments)
  discussion: Discussion;

  @OneToMany(() => DiscussionComment, (comment) => comment.responses)
  parent: DiscussionComment;

  @ManyToOne(() => DiscussionComment, (comment) => comment.parent)
  responses: DiscussionComment[];
}
