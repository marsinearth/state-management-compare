import {Instance, SnapshotIn, getParent, types} from 'mobx-state-tree';
import {SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED} from '../constants/todoFilters';

import {values} from 'mobx';

export type TTodo = typeof Todo;

export type TTodoStore = typeof TodoStore;

export interface ITodoInstance extends Instance<TTodo> {}

export interface ITodoStore extends Instance<typeof TodoStore> {}

export interface ITodoItem extends SnapshotIn<TTodo> {}

const filterType = types.union(
  ...[SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].map(types.literal),
);
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo: ITodoItem) => !todo.done,
  [SHOW_COMPLETED]: (todo: ITodoItem) => todo.done,
};

export const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

const Todo = types
  .model({
    value: types.optional(types.string, ''),
    done: types.optional(types.boolean, false),
    id: types.number,
  })
  .actions((self) => ({
    toggleDone() {
      getParent<TTodoStore>(self, 2).updateTodo(self);
    },
    delTodo() {
      getParent<TTodoStore>(self, 2).removeTodo(self.id);
    },
  }));

const TodoStore = types
  .model({
    todos: types.map(Todo),
    filter: types.optional(filterType, SHOW_ALL),
  })

  .actions((self) => ({
    addTodo(todo: ITodoItem | ITodoInstance) {
      self.todos.set(`${todo.id}`, todo);
    },
    updateTodo(todo: ITodoItem | ITodoInstance) {
      self.todos.set(`${todo.id}`, {...todo, done: !todo.done});
    },
    removeTodo(id: number) {
      self.todos.delete(`${id}`);
    },
    setFilter(filter: string) {
      self.filter = filter;
    },
  }))
  .views((self) => ({
    get todosArray() {
      return values(self.todos);
    },
    get filteredTodos() {
      return self.todosArray.filter(TODO_FILTERS[self.filter]);
    },
    get filterTitle() {
      return FILTER_TITLES[self.filter];
    },
  }));

export default TodoStore;
