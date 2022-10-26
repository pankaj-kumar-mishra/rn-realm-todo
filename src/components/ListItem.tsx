import React, {FC} from 'react';
import {StyleSheet, View, Text, Pressable, Switch} from 'react-native';
import {deleteTodoList, updateTodoList} from '../../database/allSchemas';

interface Props {
  _id: number;
  name: string;
  createdOn: Date;
  updatedOn: Date;
  completed: boolean;
  onEditPress: () => void;
}

const ListItem: FC<Props> = ({
  _id,
  updatedOn,
  createdOn,
  name,
  completed,
  onEditPress,
}): JSX.Element => {
  const handleDelete = async () => {
    try {
      const deletedTodo = await deleteTodoList(_id);
      console.log('Deleted todo', deletedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoneChange = async (done: boolean) => {
    console.log(done);
    const currDate = new Date();
    const data = {
      _id,
      name,
      createdOn,
      updatedOn: currDate,
      done,
    };
    //   console.log(data);
    try {
      const updatedTodo = await updateTodoList(data);
      console.log('Updated Todo', updatedTodo);
    } catch (error) {
      console.log('Screen Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{updatedOn.toString()}</Text>
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
          value={completed}
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
