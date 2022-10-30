import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import TodoContext, {
  RealmIdType,
  TodoList,
  TODOLIST_SCHEMA,
} from '../../database/allSchemas';

const {useRealm, useObject, useQuery} = TodoContext;

interface Props {
  _id: RealmIdType;
  todoLength: number;
}

const AddInput: FC<Props> = ({_id, todoLength}): JSX.Element => {
  const realm = useRealm();
  const todos = useQuery(TodoList);
  const todo = useObject(TodoList, _id);
  console.log('Curr Todo', todo);

  const [text, setText] = useState('');

  useEffect(() => {
    if (todo?.name) {
      setText(todo.name);
    } else {
      setText('');
    }
  }, [todo?.name]);

  const handleAddUpdate = () => {
    const name = text.trim();
    if (!name) {
      Alert.alert('Invalid Input!', 'Please enter something to add or update');
      return;
    }

    if (todo) {
      realm.write(() => {
        todo.name = name;
      });
    } else {
      realm.write(() => {
        realm.create(TODOLIST_SCHEMA, TodoList.generate(name));
      });
    }
    setText('');
  };

  const handleDeleteAll = () => {
    realm.write(() => {
      realm.delete(todos);
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
        <Pressable onPress={handleAddUpdate} style={styles.btn}>
          <Text style={styles.btnText}>{todo ? 'Update' : 'Add'}</Text>
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
