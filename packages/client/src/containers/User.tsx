import React from 'react';
import { RouteComponentProps } from '@reach/router';

export const User: React.FC<RouteComponentProps<{ username: string }>> = ({
  username,
}) => {
  return <h1>{username}</h1>;
};
