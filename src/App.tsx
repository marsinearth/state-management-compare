/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {IAnyStateTreeNode, destroy, onSnapshot} from 'mobx-state-tree';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import TodoStore, {ITodoStore} from './models/todo';

import DismissKeyboardHOC from './utils/dismissKeyboardComp';
import NavBar from './components/navBar';
import React from 'react';
import TodoList from './components/todoList';
import {connectReduxDevtools} from 'mst-middlewares';

declare const global: {HermesInternal: null | {}};

const initialState = {
  todos: {
    [Date.now()]: {
      id: Date.now(),
      value: 'Buy milk',
      done: false,
    },
    [Date.now() + 1]: {
      id: Date.now() + 1,
      value: 'Play with doge',
      done: false,
    },
  },
};

let store: ITodoStore;

function createTodoStore(snapshot: IAnyStateTreeNode) {
  // kill old store to prevent accidental use and run clean up hooks
  if (store) {
    destroy(store);
  }

  // create new one
  store = TodoStore.create(snapshot);

  // connect devtools
  connectReduxDevtools(require('remotedev'), store);
  return store;
}

const App = () => {
  const todoStore = createTodoStore(initialState);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <DismissKeyboardHOC>
          <NavBar store={todoStore} />
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
        </DismissKeyboardHOC>
        <View style={styles.body}>
          <TodoList store={todoStore} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
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

export default App;
