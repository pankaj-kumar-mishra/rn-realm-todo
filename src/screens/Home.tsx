import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {}

const Home: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
