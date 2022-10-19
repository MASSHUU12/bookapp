import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../hooks';
import Home from '../screens/home/Home';
import Add from '../screens/home/screens/Add';
import StatsScreen from '../screens/home/screens/StatsScreen';
import Single from '../screens/single/Single';
import SettingsNavigator from './SettingsNavigator';

/**
 * Navigator storing all home screens.
 *
 * @return {*}  {JSX.Element}
 */
const HomeNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const colors = useAppSelector(state => state.theme.colors);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'AndadaPro-Medium',
          },
          headerShadowVisible: false,
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Single"
          component={Single}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.accent,
            },
            // !
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitle: 'Add book manually',
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
        <Tab.Screen name="SettingsNavigator" component={SettingsNavigator} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeNavigator;
