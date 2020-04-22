import {ImmerHook, useImmer} from 'use-immer';
import React, {FC, createContext} from 'react';

import {TodoProps} from '../components/todo';

export type TodoMap = {[id: number]: TodoProps};

type TodoContextState = ImmerHook<TodoMap>;

export const TodoContext = createContext<TodoContextState>([{}, () => {}]);

export const TodoProvider: FC<unknown> = ({children}) => {
  const [todos, setTodos] = useImmer({
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
  });

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  );
};
