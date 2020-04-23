import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Todo, {TodoProps} from './todo';
import {TodoContext, TodoMap, todoFilter} from '../contexts/todoContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FilterContext} from '../contexts/filterContext';

export default function TodoList() {
  const [todos, setTodos] = useContext(TodoContext);
  const [{filter, title}] = useContext(FilterContext);

  const listData = todoFilter(Object.values(todos), filter);

  const toggleDone = (id: number) => {
    setTodos((prevTodos: TodoMap) => {
      prevTodos[id].done = !prevTodos[id].done;
      return {...prevTodos};
    });
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos: TodoMap) => {
      delete prevTodos[id];
      return {
        ...prevTodos,
      };
    });
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {listData.length} {title} Todos
        </Text>
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
