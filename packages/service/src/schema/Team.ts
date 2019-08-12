import { gql } from 'apollo-server-core';

export const TeamSchema = gql`
  type Team implements Node {
    id: ID!
    name: String
    namespace: Namespace
  }

  type TeamEdge {
    node: Team
  }

  type TeamsConnection implements Connection {
    pageInfo: PageInfo!
    edges: [TeamEdge]
  }
`;
