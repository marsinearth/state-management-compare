import {Instance, destroy, getRoot, types} from 'mobx-state-tree';

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
    remove() {
      getRoot<ITodoStore>(self).removeTodo(self as ITodoItem);
    },
    toggleDone() {
      self.done = !self.done;
    },
  }));

const TodoStore = types
  .model({
    todos: types.array(Todo),
  })
  .actions((self) => ({
    addTodo(todo: ITodoItem) {
      self.todos.push(todo);
    },
    removeTodo(todo: ITodoItem) {
      destroy(todo);
    },
  }));

export default TodoStore;
