import {
  Button,
  Modal,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction, memo, useState} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ModalRendererProps {
  showMenu: boolean;
  toggleMenu: Dispatch<SetStateAction<boolean>>;
}

const ModalRenderer = memo<ModalRendererProps>(({showMenu, toggleMenu}) => {
  const [menu, setMenu] = useState(false);
  const menuItems = [
    {
      label: '1',
      value: 'test',
    },
    {
      label: '2',
      value: 'test2',
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showMenu}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => {
          toggleMenu(false);
        }}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Text style={styles.sectionTitle}>Choose Menu</Text>
            <Picker
              selectedValue={menu}
              style={{flexGrow: 0, width: 150}}
              onValueChange={(val) => {
                setMenu(val);
                toggleMenu((m) => !m);
              }}>
              {menuItems.map((item) => (
                <Picker.Item {...item} key={item.label} />
              ))}
            </Picker>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
});

export default function Navbar() {
  const [showMenu, toggleMenu] = useState(false);

  const [addTodoText, setAddTodo] = useState('');

  return (
    <View style={styles.navContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.sectionTitle}>Simple Todo</Text>
        <Button
          title="Choose menu"
          color={Colors.primary}
          onPress={() => {
            toggleMenu((m) => !m);
          }}
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
          onPress={() => console.log('add todo!')}
        />
      </View>
      <ModalRenderer showMenu={showMenu} toggleMenu={toggleMenu} />
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
