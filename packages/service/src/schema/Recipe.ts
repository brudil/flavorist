import { gql } from 'apollo-server-core';

export const RecipeSchema = gql`
  enum RecipeVisibility {
    PUBLIC
    SECRET
    PRIVATE
  }

  type Recipe implements DatedEntity & Node {
    id: ID!
    namespace: Namespace
    name: String
    slug: String
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
    ingredients: [RecipeIngredientUse]
    revisionNumber: Int
    description: String
    recipe: Recipe
    latestRevision: RecipeRevision
    reviews: [Review]

    suggestedSteepHours: Int
    suggestedVg: Float
    shakeAndVapable: Boolean

    createdAt: String
    updatedAt: String
  }

  type RecipeIngredientUse implements Node {
    id: ID!
    ingredient: Ingredient
    percentage: Int
    note: String
  }

  input IngredientUseInput {
    ingredientId: ID!
    percentage: Int!
  }

  input CreateRecipeInput {
    name: String!
    suggestedSteepHours: Int!
    suggestedVg: Float!
    shakeAndVapable: Boolean!
    ingredients: [IngredientUseInput!]!
  }

  input UpdateRecipeInput {
    name: String
    ingredients: [IngredientUseInput]!
  }

  extend type Mutation {
    createRecipe(recipe: CreateRecipeInput!): MutationResponse
    updateRecipe(recipe: UpdateRecipeInput!): MutationResponse
  }

  extend type Query {
    recipe(recipeId: ID!): Recipe
    recipeByNamespaceAndSlug(
      namespaceName: String!
      recipeSlug: String!
    ): Recipe
  }
`;
