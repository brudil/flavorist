import gql from 'graphql-tag';

export const getViewer = gql`
  query getViewer {
    viewer {
      id
      name
      namespace {
        name
      }
    }
  }
`;
