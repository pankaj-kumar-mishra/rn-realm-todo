import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import {
  deleteAllTodoList,
  insertNewTodoList,
  updateTodoList,
} from '../../database/allSchemas';
import {TodoType} from '../screens/Home';

interface Props {
  item?: TodoType;
  todoLength: number;
}

const AddInput: FC<Props> = ({item, todoLength}): JSX.Element => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (item?.name) {
      setText(item.name);
    } else {
      setText('');
    }
  }, [item?.name]);

  const handleAdd = async () => {
    const name = text.trim();
    if (!name) {
      return;
    }
    const currDate = new Date();
    if (item) {
      const data = {
        _id: item._id,
        name,
        createdOn: item.createdOn,
        updatedOn: currDate,
      };
      console.log(data);
      try {
        const insertedTodo = await updateTodoList(data);
        console.log('Updated Todo', insertedTodo);
        setText('');
      } catch (error) {
        console.log('Screen Error', error);
      }
    } else {
      const data = {
        _id: Math.floor(Date.now() / 1000),
        name,
        createdOn: currDate,
        updatedOn: currDate,
      };
      console.log(data);
      try {
        const insertedTodo = await insertNewTodoList(data);
        console.log('Inserted Todo', insertedTodo);
        setText('');
      } catch (error) {
        console.log('Screen Error', error);
      }
    }
  };

  const handleDeleteAll = async () => {
    try {
      const deletedAll = await deleteAllTodoList();
      console.log('Deleted All Todos', deletedAll);
    } catch (error) {
      console.log(error);
    }
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
        <Pressable onPress={handleAdd} style={styles.btn}>
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
