import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {TodoType} from '../screens/Home';
import db from '../../database/sqlite';

type OmitIdTodoType = Omit<TodoType, '_id'>;

interface Props {
  item?: TodoType;
  todoLength: number;
  getTodos: () => void;
}

const AddInput: FC<Props> = ({item, todoLength, getTodos}): JSX.Element => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (item?.name) {
      setText(item.name);
    } else {
      setText('');
    }
  }, [item?.name]);

  const handleMessage = (rowsAffected: number) => {
    if (rowsAffected > 0) {
      setText('');
      getTodos();
      // Alert.alert('Transaction Success!');
    } else {
      Alert.alert('Transaction Failed!');
    }
  };

  const handleInsert = ({name, createdOn, updatedOn}: OmitIdTodoType) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO todos (name, createdOn, updatedOn) VALUES (?,?,?)',
        [name, createdOn, updatedOn],
        (tx, results) => {
          // console.log('Results', results);
          handleMessage(results.rowsAffected);
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const handleUpdate = ({_id, name, createdOn, updatedOn}: TodoType) => {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE todos set name=?, createdOn=?, updatedOn=? where _id=?',
        [name, createdOn, updatedOn, _id],
        (tx, results) => {
          // console.log('Results', results);
          handleMessage(results.rowsAffected);
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const handleAddEdit = async () => {
    const name = text.trim();
    if (!name) {
      return;
    }
    const currDate = new Date().toISOString();
    if (item) {
      const data = {
        _id: item._id,
        name,
        createdOn: item.createdOn,
        updatedOn: currDate,
      };
      try {
        handleUpdate(data);
      } catch (error) {
        console.log('Screen Error', error);
      }
    } else {
      const data = {
        name,
        createdOn: currDate,
        updatedOn: currDate,
      };
      try {
        handleInsert(data);
      } catch (error) {
        console.log('Screen Error', error);
      }
    }
  };

  const handleDeleteAll = async () => {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM todos',
        [],
        (tx, results) => {
          // console.log('Results', results);
          handleMessage(results.rowsAffected);
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  return (
    <>
      {todoLength > 1 && (
        <Pressable onPress={handleDeleteAll} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear All</Text>
        </Pressable>
      )}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Text"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={handleAddEdit} style={styles.btn}>
          <Text style={styles.btnText}>{item ? 'Update' : 'Add'}</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'goldenrod',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    marginRight: 15,
    height: 40,
    fontWeight: '600',
  },
  btn: {
    backgroundColor: 'goldenrod',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearBtn: {
    // position: 'absolute',
    // top: 0,
    // zIndex: 1,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  clearText: {
    color: '#f00',
  },
});

export default AddInput;
