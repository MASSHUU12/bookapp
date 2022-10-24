import { createContext, useEffect, useReducer, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'app/store';

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from 'helpers/Navigate';
import { settingsLoader } from 'helpers/SettingsLoader';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtherNavigator from 'navigators/OtherNavigator';
import MainNavigator from 'navigators/MainNavigator';

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

  const Stack = createNativeStackNavigator();

  // Set settings when app loads.
  useEffect(() => {
    settingsLoader();
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
              <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                  headerShown: false,
                  headerTitleStyle: {
                    fontFamily: 'AndadaPro-Medium',
                  },
                  headerShadowVisible: false,
                }}>
                <Stack.Screen name="Main" component={MainNavigator} />
                <Stack.Screen name="Other" component={OtherNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </dispatchStateContext.Provider>
        </globalStateContext.Provider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
