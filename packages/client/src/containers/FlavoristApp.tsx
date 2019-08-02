import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Router } from '@reach/router';
import { Explore } from './Explore';
import { Home } from './Home';
import { BatchesRoot } from './BatchesRoot';
import { User } from './User';
import { FourOhFour } from './FourOhFour';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { auth } from '../context/authentication';
import { Login } from './Login';
import { Register } from './Register';
import { Global } from '@emotion/core';

export const FlavoristApp: React.FC = () => {
  const { data, loading } = useQuery(gql`
    query Auth {
      viewer {
        id
        name
        username
      }
    }
  `);

  return (
    <auth.Provider
      value={{
        isLoading: loading,
        user: data.viewer || null,
        actions: { logout: () => null },
      }}
    >
      <Global
        styles={{
          body: {
            paddingLeft: 220,
          },
        }}
      />
      <React.Fragment>
        <Sidebar />
        <div>
          <Router>
            <Home path="/" />
            <Explore path="explore" />
            <BatchesRoot path="batches" />
            <Login path="login" />
            <Register path="join" />
            <User path="user/:username" />
            <FourOhFour default />
          </Router>
        </div>
      </React.Fragment>
    </auth.Provider>
  );
};
