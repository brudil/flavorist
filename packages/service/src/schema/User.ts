import { gql } from 'apollo-server-core';

export const UserSchema = gql`
  type User implements DatedEntity & Node {
    id: ID!
    name: String
    recipes: [Recipe]
    inventory: [InventoryItem]
    namespace: Namespace

    createdAt: String
    updatedAt: String
    teamsConnection: TeamsConnection
  }

  type Viewer implements DatedEntity & Node {
    id: ID!
    name: String

    namespace: Namespace

    createdAt: String
    updatedAt: String

    teamsConnection: TeamsConnection
  }

  type UserAuthorisation {
    viewer: Viewer
    token: String
  }

  type UserCreated {
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
    logout: MutationResponse
  }

  extend type Query {
    viewer: Viewer
  }
`;
