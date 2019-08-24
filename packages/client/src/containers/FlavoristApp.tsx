import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Router } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import { auth } from '../context/authentication';
import { Global } from '@emotion/core';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';
import { BrandedHeadContent } from '../components/BrandedHeadContent';
import {
  AnonymousRoute,
  AuthenticatedRoute,
} from '../components/AuthorisedRoute';
import { getViewer } from '../graphql/queries/viewer/getViewer';

const Home = loadable(async () => {
  const { Home } = await import('./Home');
  return Home;
});

const Explore = loadable(async () => {
  const { Explore } = await import('./Explore');
  return Explore;
});

const Ingredients = loadable(async () => {
  const { Ingredients } = await import('./Ingredients');
  return Ingredients;
});

const Ingredient = loadable(async () => {
  const { Ingredient } = await import('./Ingredient');
  return Ingredient;
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

const Namespace = loadable(async () => {
  const { Namespace } = await import('./Namespace');
  return Namespace;
});

const Teams = loadable(async () => {
  const { Teams } = await import('./Teams');
  return Teams;
});

const BatchesRoot = loadable(async () => {
  const { BatchesRoot } = await import('./BatchesRoot');
  return BatchesRoot;
});

const New = loadable(async () => {
  const { New } = await import('./New');
  return New;
});

const RecipesLibrary = loadable(async () => {
  const { RecipesLibrary } = await import('./RecipesLibrary');
  return RecipesLibrary;
});

const InventoryLibrary = loadable(async () => {
  const { InventoryLibrary } = await import('./InventoryLibrary');
  return InventoryLibrary;
});

const Recipe = loadable(async () => {
  const { Recipe } = await import('./Recipe');
  return Recipe;
});

export const FlavoristApp: React.FC = () => {
  const { data, loading } = useQuery(getViewer);

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
            margin: 0,
            paddingLeft: 220,
          },
        }}
      />
      <React.Fragment>
        <Helmet titleTemplate="%s | Flavorist" defaultTitle="Flavorist" />
        <BrandedHeadContent />
        <Sidebar />
        <div
          css={{
            minHeight: '100vh',
          }}
        >
          <Router>
            <Home path="/" />
            <Explore path="explore" />
            <Ingredients path="ingredients" />
            <Ingredient path="ingredients/:vendorShortName/:slug" />
            <AuthenticatedRoute Component={BatchesRoot} path="batches" />
            <AnonymousRoute Component={Login} path="login" />
            <AnonymousRoute Component={Register} path="join" />
            <AuthenticatedRoute Component={New} path="new" />
            <AuthenticatedRoute Component={Teams} path="teams" />
            <AuthenticatedRoute Component={RecipesLibrary} path="recipes" />
            <AuthenticatedRoute Component={InventoryLibrary} path="inventory" />

            <Namespace path=":name" />
            <Recipe path=":name/:recipeId" />
            <FourOhFour default />
          </Router>
        </div>
      </React.Fragment>
    </auth.Provider>
  );
};
