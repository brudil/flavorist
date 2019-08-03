import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import { auth } from '../../context/authentication';
import { globalHistory } from '@reach/router';
import { LogoutMutation } from '../../generated/graphql';
import LOGOUT_MUTATION from './LogoutMutation.graphql';

export const useLogout = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation<LogoutMutation>(LOGOUT_MUTATION);
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
