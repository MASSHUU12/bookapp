import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Books from '../screens/books/Books';

/**
 * Navigator storing all books screens.
 *
 * @return {*}  {JSX.Element}
 */
const BooksNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView>
  );
};

export default BooksNavigator;
