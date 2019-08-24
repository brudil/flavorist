import gql from 'graphql-tag';

export const createIngredientLedgerEntry = gql`
  mutation createIngredientLedgerEntry($input: IngredientLedgerEntryInput!) {
    createIngredientLedgerEntry(entry: $input) {
      id
    }
  }
`;
