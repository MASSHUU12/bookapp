import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from 'hooks';
import Home from '@screens/home/Home';
import Add from '@screens/home/screens/Add';
import StatsScreen from '@screens/home/screens/StatsScreen';
import Single from '@screens/single/Single';
import SettingsNavigator from './SettingsNavigator';

/**
 * Navigator storing all home screens.
 *
 * @return {*}  {JSX.Element}
 */
const HomeNavigator: React.FunctionComponent<any> = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Single"
        component={Single}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerShadowVisible: false,
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
      <Tab.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
