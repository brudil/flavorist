import { gql } from 'apollo-server-core';

export const BatchSchema = gql`
  type Batch implements DatedEntity {
    id: ID!
    recipe: Recipe
    recipeRevision: RecipeRevision
    user: User
    volume: Int

    createdAt: String
    updatedAt: String
  }

  extend type Query {
    batch(batchId: ID!): Batch
  }

  type BatchResponse {
    batch: Batch
  }

  input CreateBatchInput {
    recipeRevision: ID!
  }

  extend type Mutation {
    createBatch(batch: CreateBatchInput!): BatchResponse
    deleteBatch(batchId: ID!): BatchResponse
  }
`;
