import gql from 'graphql-tag';
import { teamMetadata } from './teamMetadata';
import { pageInfo } from '../core/pageInfo';

export const getTeamsForViewer = gql`
  query getTeamsForViewer {
    viewer {
      id
      name
      teamsConnection {
        pageInfo {
          ...pageInfo
        }
        edges {
          node {
            ...teamMetadata
          }
        }
      }
    }
  }

  ${pageInfo}
  ${teamMetadata}
`;
