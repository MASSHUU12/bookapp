import React, { useEffect, useReducer, useState } from 'react';
import { StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { t } from './i18n/strings';
import store from './app/store';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import SettingsNavigator from './components/navigators/SettingsNavigator';
import ListsNavigator from './components/navigators/ListsNavigator';
import BooksNavigator from './components/navigators/BooksNavigator';
import HomeNavigator from './components/navigators/HomeNavigator';

// Create new context. This error is fine, at least I hope so.
export const ThemeNavigationContext = React.createContext();

export const globalStateContext = React.createContext(1);
export const dispatchStateContext = React.createContext<any>(undefined);

const App = (): JSX.Element => {
  // Updated by context when settings change.
  const [isThemeNavigationDark, setIsThemeNavigationDark] = useState(false);
  const themeData = { isThemeNavigationDark, setIsThemeNavigationDark };

  // Get theme from the store.
  const [theme, setTheme] = useState(store.getState().themeNavigation.value);

  const [state, dispatch] = React.useReducer(x => x + 1, 0);

  const Tab = createBottomTabNavigator();

  // Get new data when context changes.
  useEffect(() => {
    setTheme(store.getState().themeNavigation.value);
  }, [isThemeNavigationDark]);

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={
          store.getState().themeNavigation.value.colors.background
        }
        barStyle={isThemeNavigationDark ? 'light-content' : 'dark-content'}
      />
      <SafeAreaProvider>
        <globalStateContext.Provider value={state}>
          <dispatchStateContext.Provider value={dispatch}>
            <ThemeNavigationContext.Provider value={themeData}>
              <NavigationContainer theme={theme}>
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

                      return (
                        <Ionicons name={iconName} size={size} color={color} />
                      );
                    },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.text,
                    tabBarActiveBackgroundColor: theme.colors.card,
                    tabBarInactiveBackgroundColor: theme.colors.card,
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
            </ThemeNavigationContext.Provider>
          </dispatchStateContext.Provider>
        </globalStateContext.Provider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
