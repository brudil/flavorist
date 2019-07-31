import React from 'react';
import { RouteComponentProps, Router } from '@reach/router';

export const BatchesRoot: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <h1>Batches</h1>
      <Router></Router>
    </div>
  );
};
