import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet-async';

export const Explore: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <Helmet title="Explore" />
      <h1>Explore</h1>
    </div>
  );
};
