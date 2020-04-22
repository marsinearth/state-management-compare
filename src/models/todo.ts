import {Instance, getRoot, types} from 'mobx-state-tree';

import {values} from 'mobx';

export interface ITodo extends Instance<typeof Todo> {}

export interface ITodoStore extends Instance<typeof TodoStore> {}

interface ITodoItem extends Omit<ITodo, 'remove' | 'toggleDone'> {}

const Todo = types
  .model({
    value: types.optional(types.string, ''),
    done: types.optional(types.boolean, false),
    id: types.number,
  })
  .actions((self) => ({
    toggleDone() {
      getRoot<ITodoStore>(self).updateTodo(self as ITodo);
    },
    delTodo() {
      getRoot<ITodoStore>(self).removeTodo(self.id);
    },
  }));

const TodoStore = types
  .model({
    todos: types.map(Todo),
  })
  .views((self) => ({
    get showList() {
      return values(self.todos);
    },
  }))
  .actions((self) => ({
    addTodo(todo: ITodoItem) {
      self.todos.set(`${todo.id}`, todo);
    },
    updateTodo(todo: ITodoItem) {
      self.todos.set(`${todo.id}`, {...todo, done: !todo.done});
    },
    removeTodo(id: number) {
      self.todos.delete(`${id}`);
    },
  }));

export default TodoStore;
