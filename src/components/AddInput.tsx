import React, {FC, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import {insertNewTodoList} from '../../database/allSchemas';

interface Props {}

const AddInput: FC<Props> = (): JSX.Element => {
  const [text, setText] = useState('');

  const handleAdd = async () => {
    const name = text.trim();
    if (!name) {
      return;
    }

    const data = {
      _id: Math.floor(Date.now() / 1000),
      name,
      createdOn: new Date(),
    };
    console.log(data);
    try {
      const insertedTodo = await insertNewTodoList(data);
      console.log('Inserted Todo', insertedTodo);
      setText('');
    } catch (error) {
      console.log('Screen Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Text"
        value={text}
        onChangeText={setText}
      />
      <Pressable onPress={handleAdd} style={styles.btn}>
        <Text style={styles.btnText}>Add</Text>
      </Pressable>
    </View>
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
});

export default AddInput;
