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
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

import DismissKeyboardHOC from './utils/dismissKeyboardComp';
import NavBar from './components/navBar';
import {Provider} from 'react-redux';
import React from 'react';
import TodoList from './components/todoList';
import store from './redux/store';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <DismissKeyboardHOC>
          <NavBar />
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
        </DismissKeyboardHOC>
        <View style={styles.body}>
          <TodoList />
        </View>
      </SafeAreaView>
    </Provider>
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
