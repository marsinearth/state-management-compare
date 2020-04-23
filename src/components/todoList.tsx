import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TODO_FILTERS, todosSelector} from '../redux/todoSlice';
import Todo, {TodoProps} from './todo';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FilterState} from '../redux/filterSlice';
import React from 'react';
import {RootReducer} from 'src/redux/store';
import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

const filteredTodoSelector = createSelector<
  RootReducer,
  TodoProps[],
  FilterState,
  {filteredTodo: TodoProps[]; title: string}
>([todosSelector.selectAll, ({filter}) => filter], (todos, {name, title}) => ({
  filteredTodo: todos.filter(TODO_FILTERS[name]),
  title,
}));

export default function TodoList() {
  const {filteredTodo, title} = useSelector(filteredTodoSelector);

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {filteredTodo.length} {title} Todos
        </Text>
      </View>

      <FlatList<TodoProps>
        data={filteredTodo}
        renderItem={(props) => <Todo {...props} />}
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
