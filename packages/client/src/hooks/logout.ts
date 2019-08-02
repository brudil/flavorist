import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import { auth } from '../context/authentication';
import gql from 'graphql-tag';
import { globalHistory } from '@reach/router';
import { LogoutMutation } from '../generated/graphql';

export const useLogout = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation<LogoutMutation>(gql`
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
