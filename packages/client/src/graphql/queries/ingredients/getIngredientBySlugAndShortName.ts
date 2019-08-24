import gql from 'graphql-tag';

export const getIngredientBySlugAndShortName = gql`
  query getIngredientBySlugAndShortName(
    $vendorShortName: String!
    $slug: String!
  ) {
    ingredientBySlugAndShortName(
      vendorShortName: $vendorShortName
      slug: $slug
    ) {
      id
      name

      vendor {
        id
        shortName
      }
    }
  }
`;
