import React, {FC} from 'react';
import {StyleSheet, FlatList, Text} from 'react-native';
import {RealmIdType} from '../../database/allSchemas';
import {ListItem} from '../components';
import {TodoType} from './Home';

interface Props {
  todos: TodoType[];
  setCurrentTodoId: (_id: RealmIdType) => void;
}

const DoneTodos: FC<Props> = ({todos, setCurrentTodoId}): JSX.Element => {
  const handleEdit = (item: TodoType) => {
    setCurrentTodoId(item._id);
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={item => item._id.toHexString()}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      extraData={todos}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>No Record Found</Text>
      )}
      renderItem={({item}) => {
        return <ListItem _id={item._id} onEditPress={() => handleEdit(item)} />;
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

export default DoneTodos;
