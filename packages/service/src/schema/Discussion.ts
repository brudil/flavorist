import { gql } from 'apollo-server-core';

export const DiscussionSchema = gql`
  type DiscussionComment {
    id: ID!
    user: User
    body: String
    replies: [DiscussionComment]
  }

  type Discussion {
    id: ID!
    comments: [DiscussionComment]
  }
`;
