import { gql } from 'apollo-server-core';

export const UserSchema = gql`
  type User implements DatedEntity {
    id: ID!
    name: String
    username: String
    recipes: [Recipe]
    inventory: [InventoryItem]

    createdAt: String
    updatedAt: String
  }

  type Viewer implements DatedEntity {
    id: ID!
    name: String
    username: String
    recipes: [Recipe]
    inventory: [InventoryItem]

    createdAt: String
    updatedAt: String
  }

  type UserAuthorisation implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    viewer: Viewer
    token: String
  }

  type UserCreated implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    token: String
    viewer: Viewer
  }

  extend type Mutation {
    createUser(
      emailAddress: String!
      username: String!
      password: String!
    ): UserCreated
    authenticateUser(
      emailAddress: String!
      password: String!
    ): UserAuthorisation
    requestPasswordReset(emailAddress: String!): MutationResponse
    logout: SimpleMutationResponse
  }

  extend type Query {
    user(userId: ID!): User
    viewer: Viewer
  }
`;
