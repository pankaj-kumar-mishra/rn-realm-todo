import React, {FC} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

interface Props {
  _id: number;
  name: string;
  updatedOn: string;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const ListItem: FC<Props> = ({
  updatedOn,
  name,
  onEditPress,
  onDeletePress,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{updatedOn}</Text>
      </View>
      <View>
        <Pressable onPress={onEditPress} style={[styles.btn, styles.editBtn]}>
          <Text style={styles.btnText}>Edit</Text>
        </Pressable>
        <Pressable onPress={onDeletePress} style={styles.btn}>
          <Text style={[styles.btnText, styles.danger]}>Delete</Text>
        </Pressable>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

export default ListItem;
