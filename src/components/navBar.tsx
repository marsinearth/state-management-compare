import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {TodoContext, TodoMap} from '../contexts/todoContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function Navbar() {
  const [, setTodo] = useContext(TodoContext);
  const [addTodoText, setAddTodo] = useState('');

  const addTodo = () => {
    if (addTodoText.trim()) {
      setTodo((prevTodos: TodoMap) => ({
        ...prevTodos,
        [Date.now()]: {
          id: Date.now(),
          value: addTodoText,
          done: false,
        },
      }));
      setAddTodo('');
    }
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.sectionTitle}>Simple Todo</Text>
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={styles.inputContainer}
          onChangeText={setAddTodo}
          value={addTodoText}
        />
        <Button
          color={Colors.primary}
          title="Add Todo"
          onPress={() => addTodo()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    height: 35,
    borderRadius: 5,
    marginRight: 25,
  },
  navContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  rowContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});
