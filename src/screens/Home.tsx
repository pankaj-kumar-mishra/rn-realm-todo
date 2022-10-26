import React, {FC, useState, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {AddInput} from '../components';
import realm, {
  getAllTodoList,
  TODOLIST_SCHEMA,
} from '../../database/allSchemas';
import {HomeNavigator} from '../navigation';

interface Props {}

export type TodoType = {
  _id: number;
  name: string;
  createdOn: Date;
  updatedOn: Date;
  done: boolean;
};

const Home: FC<Props> = (): JSX.Element => {
  const [currentItem, setCurrentItem] = useState<TodoType>();

  const [inProgressTodoList, setInProgressTodoList] = useState<TodoType[]>([]);
  const [doneTodoList, setDoneTodoList] = useState<TodoType[]>([]);

  const handleGetTodoList = async () => {
    try {
      const data = await getAllTodoList();
      // console.log('Screen Data', data);
      // setTodoList(data);

      // setTodoList([...data.inprogressTodos, ...data.doneTodos]);

      setInProgressTodoList(data.inProgressTodos);
      setDoneTodoList(data.doneTodos);
    } catch (error) {
      console.log('Screen Error', error);
    }
  };

  useEffect(() => {
    const lists = realm.objects(TODOLIST_SCHEMA);

    lists.addListener((data, changes) => {
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

  const todoListLength = useMemo(() => {
    return [...inProgressTodoList, ...doneTodoList].length;
  }, [inProgressTodoList, doneTodoList]);

  return (
    <View style={styles.container}>
      <AddInput item={currentItem} todoLength={todoListLength} />
      <HomeNavigator
        inProgressTodos={inProgressTodoList}
        doneTodos={doneTodoList}
        setCurrentItem={setCurrentItem}
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
