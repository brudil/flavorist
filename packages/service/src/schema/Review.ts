import { gql } from 'apollo-server-core';

export const ReviewSchema = gql`
  type Review implements DatedEntity {
    id: ID!
    user: User
    body: String
    rating: Int
    recipe: Recipe
    recipeRevision: RecipeRevision

    createdAt: String
    updatedAt: String
  }

  input ReviewInput {
    recipeRevision: ID!
    rating: Int!
    body: String
  }

  input UpdateReviewInput {
    recipeRevision: ID!
    rating: Int!
    body: String
  }

  extend type Mutation {
    createReview(review: ReviewInput): MutationResponse
    deleteReview(reviewId: ID!): MutationResponse
    updateReview(review: UpdateReviewInput!): MutationResponse
  }
`;
