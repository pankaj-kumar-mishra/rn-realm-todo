import React, {FC} from 'react';
import {StyleSheet, View, Text, Pressable, Switch} from 'react-native';
import TodoContext, {RealmIdType, TodoList} from '../../database/allSchemas';

const {useRealm, useObject} = TodoContext;
interface Props {
  _id: RealmIdType;
  onEditPress: () => void;
}

const ListItem: FC<Props> = ({_id, onEditPress}): JSX.Element => {
  const realm = useRealm();
  const todo = useObject(TodoList, _id);

  const handleDoneChange = () => {
    if (!todo) {
      return;
    }
    realm.write(() => {
      todo.done = !todo?.done;
    });
  };

  const handleDelete = () => {
    if (!todo) {
      return;
    }
    realm.write(() => {
      realm.delete(todo);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <Text style={styles.name}>{todo?.name}</Text>
        <Text style={styles.date}>{todo?.updatedOn.toString()}</Text>
      </View>
      <View>
        <Pressable onPress={onEditPress} style={styles.btn}>
          <Text style={styles.btnText}>Edit</Text>
        </Pressable>
        <Switch
          trackColor={{false: '#f00', true: 'green'}}
          // thumbColor={true ? 'goldenrod' : '#fff'}
          thumbColor="goldenrod"
          onValueChange={handleDoneChange}
          value={todo?.done}
          style={styles.spacing}
        />
        <Pressable onPress={handleDelete} style={styles.btn}>
          <Text style={[styles.btnText, styles.danger]}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'goldenrod',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  flex1: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    opacity: 0.5,
  },
  btn: {
    backgroundColor: 'goldenrod',
    paddingHorizontal: 6,
    borderRadius: 5,
    paddingVertical: 3,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  editBtn: {
    marginBottom: 6,
  },
  danger: {
    color: '#f00',
  },
  spacing: {
    marginVertical: 6,
  },
});

export default ListItem;
