import React, {FC} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DoneTodos, InProgressTodos} from '../screens';
import {TodoType} from '../screens/Home';

const Tab = createMaterialTopTabNavigator();

interface Props {
  inProgressTodos: TodoType[];
  doneTodos: TodoType[];
  setCurrentItem: (item: TodoType) => void;
}

const HomeNavigator: FC<Props> = ({
  inProgressTodos,
  doneTodos,
  setCurrentItem,
}): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'goldenrod',
        tabBarIndicatorStyle: {backgroundColor: 'goldenrod'},
      }}>
      <Tab.Screen
        name="InProgress"
        children={() => (
          <InProgressTodos
            todos={inProgressTodos}
            setCurrentItem={setCurrentItem}
          />
        )}
      />
      <Tab.Screen
        name="Done"
        children={() => (
          <DoneTodos todos={doneTodos} setCurrentItem={setCurrentItem} />
        )}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
