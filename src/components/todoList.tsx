import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Todo, {TodoProps} from './todo';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TodoContext} from '../contexts/todoContext';

export default function TodoList() {
  const [todos, setTodos] = useContext(TodoContext);

  const toggleDone = (todo: TodoProps) => {
    const ts = todos.map((t) => {
      if (t.id === todo.id) {
        t.done = !t.done;
      }
      return t;
    });
    setTodos(ts);
  };

  const deleteTodo = (todo: TodoProps) => {
    const ts = todos.filter(({id}) => id !== todo.id);
    setTodos(ts);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{todos.length} Todos</Text>
      </View>

      <FlatList<TodoProps>
        data={todos}
        renderItem={(props) => (
          <Todo {...props} toggleDone={toggleDone} deleteTodo={deleteTodo} />
        )}
        keyExtractor={({id}) => `${id}`}
      />
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  titleContainer: {
    paddingVertical: 32,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
});
