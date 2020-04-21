import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ITodo, ITodoStore} from 'src/models/todo';
import React, {FC} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Todo from './todo';
import {observer} from 'mobx-react';

interface TodoListProps {
  store: ITodoStore;
}

const TodoList = observer<FC<TodoListProps>>(({store}) => {
  const {todos} = store;

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{todos.length} Todos</Text>
      </View>

      <FlatList<ITodo>
        data={todos}
        extraData={todos}
        renderItem={(props) => <Todo {...props} />}
        keyExtractor={({id}) => `${id}`}
      />
    </>
  );
});

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

export default TodoList;
