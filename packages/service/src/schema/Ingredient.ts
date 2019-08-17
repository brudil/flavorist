import { gql } from 'apollo-server-core';

export const IngredientSchema = gql`
  type Ingredient implements Node {
    id: ID!
    name: String
    vendor: Vendor
    inventoryItemsOfViewer: [InventoryItem]
  }

  type InventoryItem implements Node {
    id: ID!
    ingredient: Ingredient
    user: User
    inventoryValue: Int
    inventoryCost: Int
  }

  type Vendor implements Node {
    id: ID!
    ingredients: [Ingredient]
    name: String
    shortName: String
  }

  type IngredientEdge {
    node: Ingredient
    cursor: String
  }

  type IngredientsConnection implements Connection {
    edges: [IngredientEdge]!
    pageInfo: PageInfo!
  }

  extend type Query {
    ingredient(id: ID!): Ingredient!
    searchIngredients(
      query: String!
      cursor: String
      first: Int
      last: Int
    ): IngredientsConnection
    allIngredients(
      cursor: String
      first: Int
      last: Int
    ): IngredientsConnection!
  }
`;
