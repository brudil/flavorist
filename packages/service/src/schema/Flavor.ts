import { gql } from 'apollo-server-core';

export const FlavorSchema = gql`
  type Flavor implements Node {
    id: ID!
    name: String
    vendor: Vendor
  }

  type InventoryItem implements Node {
    id: ID!
    flavor: Flavor
    user: User
    inventoryValue: Int
    inventoryCost: Int
  }

  type Vendor implements Node {
    id: ID!
    flavors: [Flavor]
    name: String
    shortName: String
  }

  extend type Query {
    ingredient(id: ID!): Flavor
    allIngredients: [Flavor]
  }
`;
