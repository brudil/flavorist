import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { globalHistory } from '@reach/router';

export const useLogin = () => {
  const { resetStore } = useApolloClient();
  const [perform] = useMutation(gql`
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
    await perform({ variables: { emailAddress, password } });
    await resetStore();
    globalHistory.navigate('/');
  };
};
