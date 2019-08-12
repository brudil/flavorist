import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { GetNamespaceProfileQuery } from '../generated/graphql';
import { getNamespaceProfile } from '../graphql/queries/namespace/getNamespaceProfile';

export const Namespace: React.FC<RouteComponentProps<{ name: string }>> = ({
  name,
}) => {
  const { data, loading, error } = useQuery<GetNamespaceProfileQuery>(
    getNamespaceProfile,
    {
      variables: { name },
    },
  );

  if (loading) {
    return <h1>loading</h1>;
  }

  if (error || !data || !data.namespace) {
    return <h1>404</h1>;
  }

  return (
    <h1>
      {data.namespace.id}
      {data.namespace.owner.__typename}
    </h1>
  );
};
