import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';

export interface TodoProps {
  id: number;
  done: boolean;
  value: string;
}

interface TodoHandleFuncs {
  toggleDone: (todo: TodoProps) => void;
  deleteTodo: (todo: TodoProps) => void;
}

export default function Todo({
  item,
  toggleDone,
  deleteTodo,
}: ListRenderItemInfo<TodoProps> & TodoHandleFuncs) {
  const {value, done} = item;

  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoSection}>
        <Text
          style={[styles.sectionTitle, {color: done ? 'gainsboro' : 'black'}]}>
          {value}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableHighlight onPress={() => toggleDone(item)}>
          <View
            style={[styles.button, {backgroundColor: done ? 'khaki' : 'teal'}]}>
            <Text
              style={[styles.btnText, {color: done ? 'gray' : 'whitesmoke'}]}>
              {done ? 'Undo' : 'Done'}
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => deleteTodo(item)}>
          <View style={[styles.button, {backgroundColor: 'lightcoral'}]}>
            <Text style={styles.btnText}>Delete</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  todoSection: {
    flex: 1,
  },
  btnContainer: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 55,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
