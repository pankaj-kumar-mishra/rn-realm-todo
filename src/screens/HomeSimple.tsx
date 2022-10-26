import React, {FC, useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AddInput, ListItem} from '../components';
import realm, {
  deleteTodoList,
  getAllTodoList,
  TODOLIST_SCHEMA,
} from '../../database/allSchemas';

interface Props {}

export type TodoType = {
  _id: number;
  name: string;
  createdOn: Date;
  updatedOn: Date;
};

const Home: FC<Props> = (): JSX.Element => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [currentItem, setCurrentItem] = useState<TodoType>();

  // i will implement later (inprogress and done)
  // const [inProgressTodoList, setInProgressTodoList] = useState<TodoType[]>([]);
  // const [doneTodoList, setDoneTodoList] = useState<TodoType[]>([]);

  const handleGetTodoList = async () => {
    try {
      const data = await getAllTodoList();
      console.log('Screen Data', data);
      // setTodoList(data);

      setTodoList([...data.inprogressTodos, ...data.doneTodos]);
    } catch (error) {
      console.log('Screen Error', error);
    }
  };

  // Not required to fetch because we are handling in listener in changes
  // useEffect(() => {
  //   handleGetTodoList();
  // }, []);

  useEffect(() => {
    const lists = realm.objects(TODOLIST_SCHEMA);

    lists.addListener((data, changes) => {
      // callback has data and changes
      // console.log('In Listener data', data);
      // console.log('In Listener changes', changes);
      // BUG typescript error
      // setTodoList(data as any); // it has some rendering issue

      handleGetTodoList();

      // console.log(changes);
      if (changes.newModifications.length > 0) {
        setCurrentItem(undefined);
      }
    });

    return () => {
      lists.removeListener(() => {
        console.log('Unmounted');
      });
      // Remember to close the realm
      realm.close();
    };
  }, []);

  const handleEdit = (item: TodoType) => {
    console.log(item);
    setCurrentItem(item);
  };

  const handleDelete = async (id: number) => {
    try {
      const deletedTodo = await deleteTodoList(id);
      console.log('Deleted todo', deletedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AddInput item={currentItem} todoLength={todoList.length} />
      <FlatList
        data={todoList}
        keyExtractor={item => item._id.toString()}
        extraData={todoList}
        showsVerticalScrollIndicator={false}
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
});

export default Home;
