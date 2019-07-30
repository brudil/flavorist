import { gql } from 'apollo-server-core';

export const DiscussionSchema = gql`
  type DiscussionComment implements DatedEntity {
    id: ID!
    user: User
    body: String
    replies: [DiscussionComment]

    createdAt: String
    updatedAt: String
  }

  type Discussion {
    id: ID!
    comments: [DiscussionComment]
  }
`;
