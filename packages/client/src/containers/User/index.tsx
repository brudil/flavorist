import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { getUserProfile } from '../../graphql/queries/user/getUserProfile';
import { GetUserProfileQuery } from '../../generated/graphql';

export const User: React.FC<RouteComponentProps<{ username: string }>> = ({
  username,
}) => {
  const { data, loading, error } = useQuery<GetUserProfileQuery>(
    getUserProfile,
    {
      variables: { username },
    },
  );

  if (loading || error || !data) {
    return <h1>loading</h1>;
  }

  return (
    <h1>
      {data.user.id}
      {data.user.username}
    </h1>
  );
};
