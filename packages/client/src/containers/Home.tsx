import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { ViewContainer } from '../components/ViewContainer';

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <ViewContainer>
      <h1>Home</h1>
    </ViewContainer>
  );
};
