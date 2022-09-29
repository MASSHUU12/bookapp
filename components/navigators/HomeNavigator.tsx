import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from '../screens/home/Home';
import Search from '../screens/home/screens/Search';

/**
 * Navigator storing all home screens.
 *
 * @return {*}  {JSX.Element}
 */
const HomeNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeNavigator;
