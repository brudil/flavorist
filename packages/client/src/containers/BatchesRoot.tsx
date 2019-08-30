import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { ViewContainer } from '../components/ViewContainer';

export const BatchesRoot: React.FC<RouteComponentProps> = () => {
  return (
    <ViewContainer>
      <h1>Batches</h1>
    </ViewContainer>
  );
};
