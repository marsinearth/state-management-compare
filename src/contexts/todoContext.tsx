import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useState,
} from 'react';

import {TodoProps} from '../components/todo';

type TodoContextState = [TodoProps[], Dispatch<SetStateAction<TodoProps[]>>];

export const TodoContext = createContext<TodoContextState>([[], () => {}]);

export const TodoProvider: FC<unknown> = ({children}) => {
  const [todos, setTodos] = useState([
    {
      id: Date.now(),
      value: 'Buy milk',
      done: false,
    },
    {
      id: Date.now() + 1,
      value: 'Play with doge',
      done: false,
    },
  ]);

  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  );
};
