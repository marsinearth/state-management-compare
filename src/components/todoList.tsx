import {FlatList, StyleSheet, Text, View} from 'react-native';
import Todo, {TodoProps} from './todo';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';

export default function TodoList() {
  const todos = [
    {
      id: Date.now(),
      value: 'Buy milk',
      done: false,
    },
    {
      id: Date.now() + 1,
      value: 'Play with doge',
      done: true,
    },
  ];
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Todos</Text>
      </View>

      <FlatList<TodoProps>
        data={todos}
        renderItem={Todo}
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
