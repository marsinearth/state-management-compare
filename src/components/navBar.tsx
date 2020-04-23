import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {TodoContext, TodoMap} from '../contexts/todoContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import FilterModal from './filterModal';

export default function Navbar() {
  const [, setTodo] = useContext(TodoContext);
  const [showModal, toggleModal] = useState<boolean>(false);
  const [addTodoText, setAddTodo] = useState('');

  const addTodo = useCallback(() => {
    if (addTodoText.trim()) {
      setTodo((draft: TodoMap) => {
        draft[Date.now()] = {
          id: Date.now(),
          value: addTodoText,
          done: false,
        };
      });
      setAddTodo('');
    }
  }, [setTodo, addTodoText]);

  return (
    <View style={styles.navContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.sectionTitle}>Simple Todo</Text>
        <Button
          color={Colors.primary}
          title="filter"
          onPress={() => toggleModal(true)}
        />
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
      <FilterModal show={showModal} onClose={() => toggleModal(false)} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});
