import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Welcome from '@screens/welcome/Welcome';

const OtherNavigator = (): JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default OtherNavigator;
