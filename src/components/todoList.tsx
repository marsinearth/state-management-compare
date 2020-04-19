import {FlatList, StyleSheet, Text, View} from 'react-native';
import Todo, {TodoProps} from './todo';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import {todosSelector} from '../redux/todoSlice';
import {useSelector} from 'react-redux';

export default function TodoList() {
  const todos = useSelector(todosSelector.selectAll);

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{todos.length} Todos</Text>
      </View>

      <FlatList<TodoProps>
        data={todos}
        renderItem={(props) => <Todo {...props} />}
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
