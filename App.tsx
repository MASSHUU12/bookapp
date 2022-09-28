import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Home from './components/screens/home/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Books from './components/screens/books/Books';
import Lists from './components/screens/lists/Lists';
import Settings from './components/screens/settings/Settings';
import { t } from './i18n/strings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReadingGoals from './components/screens/settings/screens/ReadingGoals';
import NotificationPreferences from './components/screens/settings/screens/NotificationPreferences';
import Options from './components/screens/settings/screens/Options';
import Search from './components/screens/home/screens/Search';
import { Provider } from 'react-redux';
import store from './app/store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    store.dispatch({ type: 'theme/isDark' });
  }, []);

  const HomeNavigator = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </SafeAreaView>
  );

  const BooksNavigator = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Books"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Books" component={Books} />
      </Stack.Navigator>
    </SafeAreaView>
  );

  const ListsNavigator = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Lists"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Lists" component={Lists} />
      </Stack.Navigator>
    </SafeAreaView>
  );

  const SettingsNavigator = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Settings">
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ReadingGoals"
          component={ReadingGoals}
          options={{ title: t.settings1 }}
        />
        <Tab.Screen
          name="NotificationPreferences"
          component={NotificationPreferences}
          options={{ title: t.settings2 }}
        />
        <Tab.Screen
          name="Options"
          component={Options}
          options={{ title: t.settings3 }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );

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
