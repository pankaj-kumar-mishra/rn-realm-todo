import React, {FC, useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AddInput, ListItem} from '../components';
import realm, {
  getAllTodoList,
  TODOLIST_SCHEMA,
} from '../../database/allSchemas';

interface Props {}

export type TodoType = {
  _id: number;
  name: string;
  createdOn: Date;
};

const Home: FC<Props> = (): JSX.Element => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const handleGetTodoList = async () => {
    try {
      const data = await getAllTodoList();
      // console.log('Screen Data', data);
      setTodoList(data);
    } catch (error) {
      console.log('Screen Error', error);
    }
  };

  // useEffect(() => {
  //   handleGetTodoList();
  // }, []);

  useEffect(() => {
    const lists = realm.objects(TODOLIST_SCHEMA);

    lists.addListener(() => {
      // callback has data and changes
      // console.log('In Listener data', data);
      // console.log('In Listener changes', changes);
      // BUG typescript error
      // setTodoList(data as any); // it has some rendering issue

      handleGetTodoList();
    });

    return () => {
      lists.removeListener(() => {
        console.log('Unmounted');
      });
      // Remember to close the realm
      realm.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <AddInput />
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
              createdOn={item.createdOn}
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
