import React, {FC} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {AppNavigator} from './src/navigation';
import TodoContext from './database/allSchemas';

const {RealmProvider} = TodoContext;

interface Props {}

const App: FC<Props> = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <RealmProvider>
        <AppNavigator />
      </RealmProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
