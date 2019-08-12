import gql from 'graphql-tag';
import { namespaceMetadata } from '../namespace/namespaceMetadata';

export const teamMetadata = gql`
  fragment teamMetadata on Team {
    namespace {
      ...namespaceMetadata
    }
  }

  ${namespaceMetadata}
`;
