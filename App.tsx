import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { t } from './i18n/strings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './app/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeNavigator from './components/navigators/HomeNavigator';
import BooksNavigator from './components/navigators/BooksNavigator';
import ListsNavigator from './components/navigators/ListsNavigator';
import SettingsNavigator from './components/navigators/SettingsNavigator';

const App = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    store.dispatch({ type: 'theme/isDark' });
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = 'alert';

                if (route.name === 'HomeNavigator')
                  iconName = focused ? 'home' : 'home-outline';

                if (route.name === 'BooksNavigator')
                  iconName = focused ? 'book' : 'book-outline';

                if (route.name === 'ListsNavigator')
                  iconName = focused ? 'checkbox' : 'checkbox-outline';

                if (route.name === 'SettingsNavigator')
                  iconName = focused ? 'settings' : 'settings-outline';

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#355070',
              tabBarInactiveTintColor: '#6D6D6D',
              tabBarActiveBackgroundColor: store.getState().theme.colors.accent,
              tabBarInactiveBackgroundColor:
                store.getState().theme.colors.accent,
              tabBarLabelStyle: {
                fontFamily: 'AndadaPro-Medium',
              },
              headerShown: false,
            })}
            initialRouteName="Home">
            <Tab.Screen
              name="HomeNavigator"
              component={HomeNavigator}
              options={{ title: t.nav1 }}
            />
            <Tab.Screen
              name="BooksNavigator"
              component={BooksNavigator}
              options={{ title: t.nav2 }}
            />
            <Tab.Screen
              name="ListsNavigator"
              component={ListsNavigator}
              options={{ title: t.nav3 }}
            />
            <Tab.Screen
              name="SettingsNavigator"
              component={SettingsNavigator}
              options={{ title: t.nav4 }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
