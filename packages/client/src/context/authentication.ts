import { createContext } from 'react';

export type UserData = null | {
  namespace: {
    name: string;
  };
};

export interface UserContext {
  isLoading: boolean;
  user: UserData;
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
