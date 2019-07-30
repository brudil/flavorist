import { gql } from 'apollo-server-core';

export const BatchSchema = gql`
  type Batch {
    id: ID!
    recipe: Recipe
    recipeRevision: RecipeRevision
    user: User
  }

  extend type Query {
    batch(batchId: ID!): Batch
  }
`;
