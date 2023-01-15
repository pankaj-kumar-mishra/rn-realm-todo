import React, {FC, useState, useEffect, useCallback} from 'react';
import {FlatList, StyleSheet, View, Alert, Text} from 'react-native';
import {AddInput, ListItem} from '../components';

import db from '../../database/sqlite';

interface Props {}

export type TodoType = {
  _id: number;
  name: string;
  // TODO We will add later
  createdOn: string;
  updatedOn: string;
};

// PK Reference https://github.com/Gauravbhadauria/sqlitedemo2

const Home: FC<Props> = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [currentItem, setCurrentItem] = useState<TodoType>();

  // i will implement later (inprogress and done)
  // const [inProgressTodoList, setInProgressTodoList] = useState<TodoType[]>([]);
  // const [doneTodoList, setDoneTodoList] = useState<TodoType[]>([]);

  // useEffect(() => {
  //   db.transaction((txn) => {
  //     txn.executeSql(
  //       query,  //Query to execute as prepared statement
  //       argsToBePassed[],  //Argument to pass for the prepared statement
  //       function(tx, res) {}  //Callback function to handle the result
  //     );
  //   });
  // }, []);

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='todos'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS todos', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS todos(_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), createdOn TEXT, updatedOn TEXT)',
              [],
            );
          } else {
            // txn.executeSql('DROP TABLE IF EXISTS todos', []);
            console.log('todos table already there');
          }
        },
      );
    });
  }, []);

  const getTodos = useCallback(() => {
    setLoading(true);
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM todos',
        [],
        (tx, results) => {
          // console.log('Results', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setTodoList(temp);
          setCurrentItem(undefined);
          setLoading(false);
        },
        error => {
          console.log(error);
          setLoading(false);
        },
      );
    });
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleEdit = (item: TodoType) => {
    console.log(item);
    setCurrentItem(item);
  };

  const handleDelete = async (_id: number) => {
    try {
      db.transaction(txn => {
        txn.executeSql(
          'DELETE FROM todos where _id=?',
          [_id],
          (tx, results) => {
            console.log('Results', results);
            if (results.rowsAffected > 0) {
              getTodos();
              // Alert.alert('Transaction Success!');
            } else {
              Alert.alert('Transaction Failed!');
            }
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AddInput
        item={currentItem}
        todoLength={todoList.length}
        getTodos={getTodos}
      />
      <FlatList
        data={todoList}
        keyExtractor={item => item._id.toString()}
        extraData={todoList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.notFound}>
            {loading ? 'Loading...' : 'No Record Found!'}
          </Text>
        }
        renderItem={({item}) => {
          return (
            <ListItem
              _id={item._id}
              name={item.name}
              updatedOn={item.updatedOn}
              onEditPress={() => handleEdit(item)}
              onDeletePress={() => handleDelete(item._id)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: 'red',
  },
  notFound: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    fontWeight: '600',
    color: '#f00',
  },
});

export default Home;
