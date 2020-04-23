import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ITodoInstance} from '../models/todo';
import Todo from './todo';
import {observer} from 'mobx-react-lite';
import {useMst} from '../models/root';

const TodoList: FC = observer(() => {
  const {filteredTodos, filterTitle} = useMst();

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {filteredTodos.length} {filterTitle} Todos
        </Text>
      </View>

      <FlatList<ITodoInstance>
        data={filteredTodos}
        renderItem={(props) => <Todo {...props} />}
        keyExtractor={({id}) => `${id}`}
        style={styles.listContainer}
      />
    </View>
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
    flexGrow: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  listContainer: {
    flex: 1,
  },
});

export default TodoList;
