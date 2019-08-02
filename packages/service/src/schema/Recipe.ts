import { gql } from 'apollo-server-core';

export const RecipeSchema = gql`
  enum RecipeVisibility {
    PUBLIC
    SECRET
    PRIVATE
  }

  type Recipe implements DatedEntity & Node {
    id: ID!
    user: User
    revisions: [RecipeRevision]
    latestRevision: RecipeRevision
    visibility: RecipeVisibility
    discussion: Discussion
    reviews: [Review]
    remixes: [Recipe]
    remixOf: Recipe

    createdAt: String
    updatedAt: String
  }

  type RecipeRevision implements DatedEntity & Node {
    id: ID!
    name: String
    ingredients: [FlavorUse]
    revisionNumber: Int
    recpie: Recipe
    latestRevision: RecipeRevision
    reviews: [Review]

    createdAt: String
    updatedAt: String
  }

  type FlavorUse implements Node {
    id: ID!
    flavor: Flavor
    percentage: Int
  }

  input IngredientUseInput {
    flavorId: ID!
    percentage: Int!
  }

  input CreateRecipeInput {
    name: String!
    ingredients: [IngredientUseInput]!
  }

  input UpdateRecipeInput {
    name: String
    ingredients: [IngredientUseInput]!
  }

  extend type Mutation {
    createRecipe(recipie: CreateRecipeInput): MutationResponse
    updateRecipe(recipie: UpdateRecipeInput): MutationResponse
  }

  extend type Query {
    recipe(recipeId: ID!): Recipe
  }
`;
