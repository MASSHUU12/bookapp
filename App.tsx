import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './components/screens/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Books from './components/screens/books/Books';
import Lists from './components/screens/lists/Lists';
import Settings from './components/screens/settings/Settings';
import { strings } from './i18n/strings';

const App = (): JSX.Element => {
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
          tabBarLabelStyle: {
            fontFamily: 'AndadaPro-Medium',
          },
          headerShown: false,
        })}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: strings.nav1 }}
        />
        <Tab.Screen
          name="Books"
          component={Books}
          options={{ title: strings.nav2 }}
        />
        <Tab.Screen
          name="Lists"
          component={Lists}
          options={{ title: strings.nav3 }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ title: strings.nav4 }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
