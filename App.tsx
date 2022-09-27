import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './components/screens/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Books from './components/screens/books/Books';
import Lists from './components/screens/lists/Lists';
import Settings from './components/screens/settings/Settings';

const App: () => JSX.Element = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'alert';

            if (route.name === 'Home')
              iconName = focused ? 'home' : 'home-outline';

            if (route.name === 'Books')
              iconName = focused ? 'book' : 'book-outline';

            if (route.name === 'Lists')
              iconName = focused ? 'checkbox' : 'checkbox-outline';

            if (route.name === 'Settings')
              iconName = focused ? 'settings' : 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#355070',
          tabBarInactiveTintColor: '#6D6D6D',
          headerShown: false,
        })}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Books" component={Books} />
        <Tab.Screen name="Lists" component={Lists} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
