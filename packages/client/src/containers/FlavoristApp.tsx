import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Router } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { auth } from '../context/authentication';
import { Global } from '@emotion/core';
import Helmet from 'react-helmet';
import loadable from '@loadable/component';

const Home = loadable(async () => {
  const { Home } = await import('./Home');
  return Home;
});

const Explore = loadable(async () => {
  const { Explore } = await import('./Explore');
  return Explore;
});

const FourOhFour = loadable(async () => {
  const { FourOhFour } = await import('./FourOhFour');
  return FourOhFour;
});

const Login = loadable(async () => {
  const { Login } = await import('./Login');
  return Login;
});

const Register = loadable(async () => {
  const { Register } = await import('./Register');
  return Register;
});

const User = loadable(async () => {
  const { User } = await import('./User');
  return User;
});

const BatchesRoot = loadable(async () => {
  const { BatchesRoot } = await import('./BatchesRoot');
  return BatchesRoot;
});

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
        <Helmet titleTemplate="%s | Flavorist" defaultTitle="Flavorist" />
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
