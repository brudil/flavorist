import { gql } from 'apollo-server-core';

export const RecipeSchema = gql`
  enum RecipeVisibility {
    PUBLIC
    SECRET
    PRIVATE
  }

  type Recipe {
    id: ID!
    user: User
    revisions: [RecipeRevision]
    latestRevision: RecipeRevision
    visibility: RecipeVisibility
    discussion: Discussion
    remixes: [Recipe]
    remixOf: Recipe
  }

  type RecipeRevision {
    id: ID!
    name: String
    ingredients: [FlavorUse]
    revisionNumber: Int
    recpie: Recipe
    latestRevision: RecipeRevision
  }

  type FlavorUse {
    id: ID!
    flavor: Flavor
    title: String
  }

  extend type Query {
    recipe(recipeId: ID!): Recipe
  }
`;
