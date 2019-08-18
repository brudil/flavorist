import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet-async';

export const FourOhFour: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <Helmet title="404" />
      <h1>404!</h1>
    </div>
  );
};
