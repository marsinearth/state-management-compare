import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useMemo} from 'react';
import Todo, {TodoProps} from './todo';
import {TodoContext, TodoMap} from '../contexts/todoContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function TodoList() {
  const [todos, setTodos] = useContext(TodoContext);

  const listData = useMemo(() => Object.values(todos), [todos]);

  const toggleDone = useCallback(
    (id: number) => {
      setTodos((prevTodos: TodoMap) => {
        prevTodos[id].done = !prevTodos[id].done;
        return {...prevTodos};
      });
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setTodos((prevTodos: TodoMap) => {
        delete prevTodos[id];
        return {
          ...prevTodos,
        };
      });
    },
    [setTodos],
  );

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{listData.length} Todos</Text>
      </View>

      <FlatList<TodoProps>
        data={listData}
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
