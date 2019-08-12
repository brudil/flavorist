import gql from 'graphql-tag';

export const namespaceMetadata = gql`
  fragment namespaceMetadata on Namespace {
    name
  }
`;
