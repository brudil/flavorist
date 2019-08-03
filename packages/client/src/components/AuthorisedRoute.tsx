import React, { useContext } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { auth, UserData } from '../context/authentication';

export interface AuthorisedRouteProps {
  Component: any;
}

const createValidatedRoute = (
  validate: (user: UserData) => boolean,
  redirect: (props: RouteComponentProps) => string,
): React.FC<AuthorisedRouteProps & RouteComponentProps> => {
  return ({ Component, ...props }) => {
    const { user } = useContext(auth);

    if (validate(user)) {
      return <Redirect to={redirect(props)} noThrow />;
    }

    return <Component {...props} />;
  };
};

export const AuthenticatedRoute = createValidatedRoute(
  (user) => user === null,
  ({ location }) => `/login${location && '?next=' + location.pathname}`,
);
export const AnonymousRoute = createValidatedRoute(
  (user) => user !== null,
  () => '/',
);
