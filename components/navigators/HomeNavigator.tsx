import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../hooks';
import Home from '../screens/home/Home';
import Search from '../screens/home/screens/Search';
import Single from '../screens/single/Single';

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
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen
          name="Single"
          component={Single}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.accent,
            },
            headerTitleStyle: {
              fontFamily: 'AndadaPro-Medium',
              color: colors.text,
            },
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeNavigator;
