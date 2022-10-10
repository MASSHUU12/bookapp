import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../hooks';
import Lists from '../screens/lists/Lists';
import ListsRecords from '../screens/lists/screens/ListsRecords';

/**
 * Navigator storing all lists screens.
 *
 * @return {*}  {JSX.Element}
 */
const ListsNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const colors = useAppSelector(state => state.theme.colors);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Lists"
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'AndadaPro-Medium',
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
        }}>
        <Tab.Screen name="Lists" component={Lists} />
        <Tab.Screen
          name="ListsRecords"
          component={ListsRecords}
          options={({ route }) => ({
            title: route.params ? route.params.name : 'Your list',
            headerShown: true,
          })}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default ListsNavigator;
