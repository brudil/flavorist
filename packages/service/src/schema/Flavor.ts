import { gql } from 'apollo-server-core';

export const FlavorSchema = gql`
  type Flavor {
    id: ID!
    name: String
    vendor: Vendor
  }

  type InventoryItem {
    id: ID!
    flavor: Flavor
    user: User
    inventoryValue: Int
    inventoryCost: Int
  }

  type Vendor {
    id: ID!
    flavors: [Flavor]
    name: String
    shortName: String
  }

  extend type Query {
    flavour(flavorId: ID!): Flavor
  }
`;
