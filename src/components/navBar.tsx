import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addTodo} from '../redux/todoSlice';
import {useDispatch} from 'react-redux';

export default function Navbar() {
  const dispatch = useDispatch();
  const [addTodoText, setAddTodo] = useState('');

  const dispatchTodo = () => {
    if (addTodoText.trim()) {
      dispatch(
        addTodo({
          id: Date.now(),
          value: addTodoText,
          done: false,
        }),
      );
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
          onPress={() => dispatchTodo()}
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
