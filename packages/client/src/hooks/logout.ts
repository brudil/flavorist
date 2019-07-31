import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { NavigateFn } from '@reach/router';
import { useContext } from 'react';
import { auth } from '../context/authentication';
import gql from 'graphql-tag';
import { globalHistory } from '@reach/router';

export const useLogout = (navigate: NavigateFn) => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation(gql`
    mutation Logout {
      logout {
        success
      }
    }
  `);
  const {
    actions: { logout },
  } = useContext(auth);

  return async () => {
    await perform();
    logout();
    await resetStore();
    globalHistory.navigate('/');
  };
};
