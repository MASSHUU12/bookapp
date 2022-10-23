import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../hooks';
import Lists from '../components/screens/lists/Lists';
import ListsRecords from '../components/screens/lists/screens/ListsRecords';

/**
 * Navigator storing all lists screens.
 *
 * @return {*}  {JSX.Element}
 */
const ListsNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Stack.Navigator
      initialRouteName="Lists"
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'AndadaPro-Medium',
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
      }}>
      <Tab.Screen name="Lists" component={Lists} />
      <Tab.Screen
        name="ListsRecords"
        component={ListsRecords}
        options={({ route }) => ({
          title: route.params ? route.params.name : 'Your list',
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default ListsNavigator;
