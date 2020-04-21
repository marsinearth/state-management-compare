import {types} from 'mobx-state-tree';

const Todo = types.model({
  value: types.optional(types.string, ''),
  done: types.optional(types.boolean, false),
  id: new Date(),
});

const TodoStore = types
  .model({
    todos: types.map(Todo),
  })
  .views((self) => ({
    // utilities
    findTodoById: function (id: string) {
      return self.todos.get(id);
    },
  }))
  .actions((self) => ({
    addTodo(value: string) {
      self.todos.set(`${new Date()}`, Todo.create({value}));
    },
    delTodo(id: string) {
      self.todos.delete(id);
    },
    toggleTodoDone(id: string) {
      const todo = self.todos.get(id);
      if (todo) {
        todo.done = !todo?.done;
      }
    },
  }));

export default TodoStore;
