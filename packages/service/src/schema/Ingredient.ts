import { gql } from 'apollo-server-core';

export const IngredientSchema = gql`
  type Ingredient implements Node {
    id: ID!
    name: String
    vendor: Vendor
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

  type AllIngredientsConnection {
    edges: [IngredientEdge]!
    pageInfo: PageInfo!
  }

  extend type Query {
    ingredient(id: ID!): Ingredient!
    allIngredients(
      cursor: String
      first: Int
      last: Int
    ): AllIngredientsConnection!
  }
`;
