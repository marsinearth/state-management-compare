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
      setTodos((draft: TodoMap) => {
        draft[id].done = !draft[id].done;
      });
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setTodos((draft: TodoMap) => {
        delete draft[id];
      });
    },
    [setTodos],
  );

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{listData.length} Todos</Text>
      </View>

      <FlatList<TodoProps>
        data={listData}
        renderItem={(props) => (
          <Todo {...props} toggleDone={toggleDone} deleteTodo={deleteTodo} />
        )}
        keyExtractor={({id}) => `${id}`}
        style={styles.listContainer}
      />
    </View>
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
    flexGrow: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  listContainer: {
    flex: 1,
  },
});
