import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Router } from '@reach/router';
import { Explore } from './Explore';
import { Home } from './Home';

export const Application: React.FC = () => {
  return (
    <React.Fragment>
      <Sidebar logoSrc="x" />
      <div>
        <Router>
          <Home path="/" />
          <Explore path="explore" />
        </Router>
      </div>
    </React.Fragment>
  );
};
