import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../hooks';
import Home from '../screens/home/Home';
import Add from '../screens/home/screens/Add';
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
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'AndadaPro-Medium',
          },
          headerShadowVisible: false,
        }}>
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
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeNavigator;
