import React, {FC} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DoneTodos, InProgressTodos} from '../screens';
import {TodoType} from '../screens/Home';
import {RealmIdType} from '../../database/allSchemas';

const Tab = createMaterialTopTabNavigator();

interface Props {
  inProgressTodos: TodoType[];
  doneTodos: TodoType[];
  setCurrentTodoId: (item: RealmIdType) => void;
}

const HomeNavigator: FC<Props> = ({
  inProgressTodos,
  doneTodos,
  setCurrentTodoId,
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
            setCurrentTodoId={setCurrentTodoId}
          />
        )}
      />
      <Tab.Screen
        name="Done"
        children={() => (
          <DoneTodos todos={doneTodos} setCurrentTodoId={setCurrentTodoId} />
        )}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
