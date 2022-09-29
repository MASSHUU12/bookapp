import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lists from '../screens/lists/Lists';

/**
 * Navigator storing all lists screens.
 *
 * @return {*}  {JSX.Element}
 */
const ListsNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Lists"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Lists" component={Lists} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default ListsNavigator;
