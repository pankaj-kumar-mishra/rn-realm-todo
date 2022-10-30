import React, {FC, useState, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {AddInput} from '../components';
import TodoContext, {
  realmId,
  RealmIdType,
  TodoList,
} from '../../database/allSchemas';
import {HomeNavigator} from '../navigation';

const {useQuery} = TodoContext;

interface Props {}

export type TodoType = {
  _id: RealmIdType;
  name: string;
  createdOn: Date;
  updatedOn: Date;
  done: boolean;
};

const Home: FC<Props> = (): JSX.Element => {
  const todos = useQuery(TodoList);

  const [currentTodoId, setCurrentTodoId] = useState<RealmIdType>(realmId());

  const [inProgressTodoList, setInProgressTodoList] = useState<TodoType[]>([]);
  const [doneTodoList, setDoneTodoList] = useState<TodoType[]>([]);

  useEffect(() => {
    todos.addListener((data, changes) => {
      const allSortedTodos = data.sorted('updatedOn', true);
      const inProgressTodos = allSortedTodos.filter(item => !item.done);
      const doneTodos = allSortedTodos.filter(item => item.done);

      setInProgressTodoList(inProgressTodos);
      setDoneTodoList(doneTodos);

      if (changes.newModifications.length > 0) {
        setCurrentTodoId(realmId());
      }
    });

    return () => {
      todos.removeListener(() => {
        console.log('Unmounted');
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todoListLength = useMemo(() => {
    return [...inProgressTodoList, ...doneTodoList].length;
  }, [inProgressTodoList, doneTodoList]);

  return (
    <View style={styles.container}>
      <AddInput _id={currentTodoId} todoLength={todoListLength} />
      <HomeNavigator
        inProgressTodos={inProgressTodoList}
        doneTodos={doneTodoList}
        setCurrentTodoId={setCurrentTodoId}
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
