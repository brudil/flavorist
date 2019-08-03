import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { globalHistory } from '@reach/router';
import { LoginMutation } from '../../generated/graphql';
import LOGIN_MUTATION from './LoginMutation.graphql';

export const useLogin = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation<LoginMutation>(LOGIN_MUTATION);

  return async (emailAddress: string, password: string) => {
    const result = await perform({ variables: { emailAddress, password } });

    console.log(result);

    await resetStore();
    globalHistory.navigate('/');
  };
};
