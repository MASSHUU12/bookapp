import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Books from '@screens/books/Books';

/**
 * Navigator storing all books screens.
 *
 * @return {*}  {JSX.Element}
 */
const BooksNavigator: React.FunctionComponent<any> = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Books"
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'AndadaPro-Medium',
        },
      }}>
      <Tab.Screen name="Books" component={Books} />
    </Stack.Navigator>
  );
};

export default BooksNavigator;
