import React, {FC} from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import {ListItem} from '../components';
import {TodoType} from './Home';

interface Props {
  todos: TodoType[];
  setCurrentItem: (item: TodoType) => void;
}

const InProgressTodos: FC<Props> = ({todos, setCurrentItem}): JSX.Element => {
  // console.log(todos);
  const handleEdit = (item: TodoType) => {
    // console.log(item);
    setCurrentItem(item);
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={item => item._id.toString()}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>No Record Found</Text>
      )}
      renderItem={({item}) => {
        return (
          <ListItem
            _id={item._id}
            name={item.name}
            createdOn={item.createdOn}
            updatedOn={item.updatedOn}
            completed={item.done}
            onEditPress={() => handleEdit(item)}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginTop: 10,
  },
  empty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f00',
    textAlign: 'center',
  },
});

export default InProgressTodos;
