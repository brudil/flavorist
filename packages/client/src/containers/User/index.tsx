import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

import USER_PROFILE_QUERY from './UserProfile.graphql';

export const User: React.FC<RouteComponentProps<{ username: string }>> = ({
  username,
}) => {
  const { data, loading, error } = useQuery(USER_PROFILE_QUERY, {
    variables: { username },
  });

  if (loading || error) {
    return <h1>loading</h1>;
  }

  return (
    <h1>
      {data.user.id}
      {data.user.username}
    </h1>
  );
};
