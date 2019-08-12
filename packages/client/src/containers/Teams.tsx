import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { getTeamsForViewer } from '../graphql/queries/teams/getTeamsForViewer';
import { GetTeamsForViewerQuery } from '../generated/graphql';

export const Teams: React.FC<RouteComponentProps> = () => {
  const { data, loading } = useQuery<GetTeamsForViewerQuery>(getTeamsForViewer);

  return (
    <div>
      <h1>Teams</h1>

      {loading || !data ? (
        <h1>Loading</h1>
      ) : (
        data!.viewer!.teamsConnection!.edges!.map((edge) => (
          <li>{edge!.node!.namespace!.name}</li>
        ))
      )}
    </div>
  );
};
