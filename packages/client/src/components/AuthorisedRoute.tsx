import React, { useContext } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { auth, UserData } from '../context/authentication';
import { ViewCrashErrorBoundary } from './ViewCrashErrorBoundary';

export interface AuthorisedRouteProps {
  Component: any;
}

const createValidatedRoute = (
  validate: (user: UserData) => boolean,
  redirect: (props: RouteComponentProps) => string,
): React.FC<AuthorisedRouteProps & RouteComponentProps> => {
  return ({ Component, ...props }) => {
    const { user, isLoading } = useContext(auth);

    if (isLoading) {
      return null;
    }

    if (validate(user)) {
      return <Redirect to={redirect(props)} noThrow />;
    }

    return (
      <ViewCrashErrorBoundary>
        <Component {...props} />
      </ViewCrashErrorBoundary>
    );
  };
};

export const AuthenticatedRoute = createValidatedRoute(
  (user) => user === null,
  ({ location }) => `/login${location && '?next=' + location.pathname}`,
);
export const AnonymousOnlyRoute = createValidatedRoute(
  (user) => user !== null,
  () => '/',
);
export const PublicRoute = createValidatedRoute(() => false, () => '/');
