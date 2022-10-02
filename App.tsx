import { createContext, useEffect, useReducer, useState } from 'react';
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
import { navigationRef } from './helpers/Navigate';
import { getItem } from './helpers/Storage';
import { isDark } from './features/theme/themeSlice';
import { isNavigationDark } from './features/navigationTheme/navigationThemeSlice';

export const globalStateContext = createContext(1);
export const dispatchStateContext = createContext<any>(undefined);

/**
 * Main component.
 *
 * @return {*}  {JSX.Element}
 */
const App = (): JSX.Element => {
  // Get theme from the store.
  const [theme, setTheme] = useState(store.getState().themeNavigation.value);

  const [state, dispatch] = useReducer(x => x + 1, 0);

  const Tab = createBottomTabNavigator();

  // Set settings when app loads.
  useEffect(() => {
    getItem('language').then(item => t.setLanguage(item as string));
    getItem('theme').then(item => {
      store.dispatch(isDark(item === 'light' ? false : true));
      store.dispatch(isNavigationDark(item === 'light' ? false : true));
    });
  }, []);

  // Update settings when store changes.
  store.subscribe(() => {
    setTheme(store.getState().themeNavigation.value);
  });

  return (
    // Store provider.
    <Provider store={store}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      {/* Save area provider. */}
      <SafeAreaProvider>
        {/* Context. */}
        <globalStateContext.Provider value={state}>
          <dispatchStateContext.Provider value={dispatch}>
            {/* Navigation container. */}
            <NavigationContainer theme={theme} ref={navigationRef}>
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
          </dispatchStateContext.Provider>
        </globalStateContext.Provider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
