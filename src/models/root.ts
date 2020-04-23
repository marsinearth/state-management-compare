import {createContext, useContext} from 'react';

import {Instance} from 'mobx-state-tree';
import TodoStore from './todo';
import {connectReduxDevtools} from 'mst-middlewares';

export const rootStore = TodoStore.create({
  todos: {
    [Date.now()]: {
      id: Date.now(),
      value: 'Buy milk',
      done: false,
    },
    [Date.now() + 1]: {
      id: Date.now() + 1,
      value: 'Play with doge',
      done: false,
    },
  },
});

connectReduxDevtools(require('remotedev'), rootStore);

export type RootInstance = Instance<typeof rootStore>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
