import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AccountDeletion from './screens/AccountDeletion';
import AccountDeletionSuccess from './screens/AccountDeletionSuccess'
import BloodPressure from './screens/BloodPressure';
import BloodPressureSuccess from './screens/BloodPressureSuccess';

export type RootStackParamList = {
  AccountDeletion: undefined;
  AccountDeletionSuccess: undefined;
  BloodPressure: undefined;
  BloodPressureSuccess: undefined
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AccountDeletion">
        <Stack.Screen
          name="AccountDeletion"
          component={AccountDeletion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountDeletionSuccess"
          component={AccountDeletionSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BloodPressure"
          component={BloodPressure}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="BloodPressureSuccess"
          component={BloodPressureSuccess}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
