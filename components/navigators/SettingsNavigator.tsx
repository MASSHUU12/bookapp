import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t } from '../../i18n/strings';
import NotificationPreferences from '../screens/settings/screens/NotificationPreferences';
import Options from '../screens/settings/screens/Options';
import ReadingGoals from '../screens/settings/screens/ReadingGoals';
import Settings from '../screens/settings/Settings';

/**
 * Navigator storing all setting screens.
 *
 * @return {*}  {JSX.Element}
 */
const SettingsNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Settings">
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ReadingGoals"
          component={ReadingGoals}
          options={{ title: t.settings1 }}
        />
        <Tab.Screen
          name="NotificationPreferences"
          component={NotificationPreferences}
          options={{ title: t.settings2 }}
        />
        <Tab.Screen
          name="Options"
          component={Options}
          options={{ title: t.settings3 }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default SettingsNavigator;
