import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { globalHistory } from '@reach/router';
import { LoginMutation } from '../generated/graphql';

export const useLogin = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation<LoginMutation>(gql`
    mutation Login($emailAddress: String!, $password: String!) {
      authenticateUser(emailAddress: $emailAddress, password: $password) {
        code

        viewer {
          username
        }
      }
    }
  `);

  return async (emailAddress: string, password: string) => {
    const result = await perform({ variables: { emailAddress, password } });

    console.log(result);

    await resetStore();
    globalHistory.navigate('/');
  };
};
