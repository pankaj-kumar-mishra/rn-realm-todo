import React, {FC} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {AppNavigator} from './src/navigation';

interface Props {}

const App: FC<Props> = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
