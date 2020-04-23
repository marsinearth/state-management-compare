import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC, useState} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import FilterModal from './filterModal';
import {observer} from 'mobx-react-lite';
import {useMst} from '../models/root';

const Navbar: FC = observer(() => {
  const {addTodo} = useMst();
  const [showModal, toggleModal] = useState<boolean>(false);
  const [addTodoText, setAddTodo] = useState<string>('');

  const onAddTodo = () => {
    if (addTodoText.trim()) {
      addTodo({
        id: Date.now(),
        value: addTodoText,
        done: false,
      });
      setAddTodo('');
    }
  };

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
          onPress={() => onAddTodo()}
        />
      </View>
      <FilterModal show={showModal} onClose={() => toggleModal(false)} />
    </View>
  );
});

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

export default Navbar;
