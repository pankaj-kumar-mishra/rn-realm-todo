import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  _id: number;
  name: string;
  createdOn: Date;
}

const ListItem: FC<Props> = ({_id, createdOn, name}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.date}>{createdOn.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'goldenrod',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    opacity: 0.5,
  },
});

export default ListItem;
