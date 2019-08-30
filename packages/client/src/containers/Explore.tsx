import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Helmet } from 'react-helmet-async';
import { ViewContainer } from '../components/ViewContainer';

export const Explore: React.FC<RouteComponentProps> = () => {
  return (
    <ViewContainer>
      <Helmet title="Explore" />
      <h1>Explore</h1>
    </ViewContainer>
  );
};
