import { User } from './User';
import { BaseModel } from './Base';
export class Discussion extends BaseModel {
  comments: DiscussionComment[];
}

export class DiscussionComment extends BaseModel {
  user: User;

  discussion: Discussion;

  parent: DiscussionComment;

  responses: DiscussionComment[];

  createdAt: Date;

  updatedAt: Date;
}
