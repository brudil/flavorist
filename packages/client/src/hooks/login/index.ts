import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { globalHistory } from '@reach/router';
import { decode } from 'qss';
import { performLogin } from '../../graphql/mutations/auth/performLogin';
import { PerformLoginMutation } from '../../generated/graphql';

export const useLogin = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation<PerformLoginMutation>(performLogin);

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
