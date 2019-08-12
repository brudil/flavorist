import { gql } from 'apollo-server-core';

export const NamespaceSchema = gql`
  union NamespaceOwner = User | Team

  type Namespace implements DatedEntity & Node {
    id: ID!
    name: String!
    recipes: [Recipe]
    inventory: [InventoryItem]

    owner: NamespaceOwner!

    createdAt: String
    updatedAt: String
  }

  extend type Query {
    namespace(name: String!): Namespace
  }
`;
