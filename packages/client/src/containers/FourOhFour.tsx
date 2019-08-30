import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet-async';
import { ViewContainer } from '../components/ViewContainer';

export const FourOhFour: React.FC<RouteComponentProps> = () => {
  return (
    <ViewContainer>
      <Helmet title="404" />
      <h1>404!</h1>
    </ViewContainer>
  );
};
