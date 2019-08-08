import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import { auth } from '../../context/authentication';
import { performLogin } from '../../graphql/mutations/auth/performLogin';
import { PerformLogoutMutation } from '../../generated/graphql';

export const useLogout = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation<PerformLogoutMutation>(performLogin);
  const {
    actions: { logout },
  } = useContext(auth);

  return async () => {
    await perform();
    logout();
    await resetStore();
    // globalHistory.navigate('/'); I'm thinking we don't need this now, authenticated routes will redirect out anyway.
  };
};
