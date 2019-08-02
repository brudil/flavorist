import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Helmet from 'react-helmet';

export const Explore: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <Helmet title="404" />
      <h1>Explore</h1>
    </div>
  );
};
