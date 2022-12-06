import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { t } from 'i18n/strings';
import Search from '@screens/search/Search';

import BooksNavigator from './BooksNavigator';
import HomeNavigator from './HomeNavigator';
import ListsNavigator from './ListsNavigator';

const MainNavigator: React.FunctionComponent<any> = (): JSX.Element => {
  const Tab = createBottomTabNavigator();

  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'alert';

            if (route.name === 'HomeNavigator')
              iconName = focused ? 'home' : 'home-outline';

            if (route.name === 'Search')
              iconName = focused ? 'search' : 'search-outline';

            if (route.name === 'BooksNavigator')
              iconName = focused ? 'book' : 'book-outline';

            if (route.name === 'ListsNavigator')
              iconName = focused ? 'checkbox' : 'checkbox-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
          tabBarActiveBackgroundColor: colors.card,
          tabBarInactiveBackgroundColor: colors.card,
          tabBarLabelStyle: {
            fontFamily: 'AndadaPro-Medium',
          },
          headerShown: false,
        })}
        initialRouteName="HomeNavigator">
        <Tab.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{ title: t.nav1 }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            title: t.nav4,
          }}
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
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigator;
