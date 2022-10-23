import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {}

const Details: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Details;
