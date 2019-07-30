import { gql } from 'apollo-server-core';

export const RecipeSchema = gql`
  enum RecipeVisibility {
    PUBLIC
    SECRET
    PRIVATE
  }

  type Recipe implements DatedEntity {
    id: ID!
    user: User
    revisions: [RecipeRevision]
    latestRevision: RecipeRevision
    visibility: RecipeVisibility
    discussion: Discussion
    remixes: [Recipe]
    remixOf: Recipe

    createdAt: String
    updatedAt: String
  }

  type RecipeRevision implements DatedEntity {
    id: ID!
    name: String
    ingredients: [FlavorUse]
    revisionNumber: Int
    recpie: Recipe
    latestRevision: RecipeRevision

    createdAt: String
    updatedAt: String
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
