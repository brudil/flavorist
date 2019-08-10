import { gql } from 'apollo-server-core';

export const UserSchema = gql`
  union NamespaceOwner = User | Team

  type Namespace implements DatedEntity & Node {
    id: ID!
    name: String
    slug: String!
    recipes: [Recipe]
    inventory: [InventoryItem]

    owner: NamespaceOwner

    createdAt: String
    updatedAt: String
  }

  extend type Query {
    namespace(slug: String!): Namespace
  }
`;
