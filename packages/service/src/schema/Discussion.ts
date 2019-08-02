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

  input PostDiscussionInput {
    discussion: ID!
    body: String!
    reply: ID!
  }

  extend type Mutation {
    addDiscussionComment(input: PostDiscussionInput!): MutationResponse
    updateDiscussionComment(
      discussionComment: ID!
      body: String!
    ): MutationResponse
    deleteDiscussionComment(discussionComment: ID!): MutationResponse
  }
`;
