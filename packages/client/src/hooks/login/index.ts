import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { globalHistory } from '@reach/router';
import { LoginMutation } from '../../generated/graphql';
import LOGIN_MUTATION from './LoginMutation.graphql';
import { decode } from 'qss';

export const useLogin = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation<LoginMutation>(LOGIN_MUTATION);

  return async (emailAddress: string, password: string) => {
    const result = await perform({ variables: { emailAddress, password } });

    console.log(result);

    await resetStore();
    const query = decode<{ next?: string }>(
      globalHistory.location.search.slice(1),
    );
    console.log(location.search);
    console.log(query);
    globalHistory.navigate(query.next ? query.next : '/');
  };
};
