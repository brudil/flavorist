import { createContext } from 'react';

export interface UserContext {
  isLoading: boolean;
  user: null | {
    username: string;
  };
  actions: {
    logout: () => void;
  };
}
const noop = () => null;

export const auth = createContext<UserContext>({
  isLoading: true,
  user: null,
  actions: {
    logout: noop,
  },
});
