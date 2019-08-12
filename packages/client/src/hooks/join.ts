import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { globalHistory } from '@reach/router';
import { decode } from 'qss';
import { performJoin } from '../graphql/mutations/auth/performJoin';
import { PerformJoinMutation } from '../generated/graphql';

export const useJoin = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation<PerformJoinMutation>(performJoin);

  return async (emailAddress: string, username: string, password: string) => {
    const result = await perform({
      variables: { emailAddress, username, password },
    });

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
