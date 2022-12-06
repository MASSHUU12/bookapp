import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from 'hooks';
import { t } from 'i18n/strings';

import Dev from '@screens/settings/screens/Dev';
import NotificationPreferences from '@screens/settings/screens/NotificationPreferences';
import Options from '@screens/settings/screens/Options';
import ReadingGoals from '@screens/settings/screens/ReadingGoals';
import Settings from '@screens/settings/Settings';

/**
 * Navigator storing all setting screens.
 *
 * @return {*}  {JSX.Element}
 */
const SettingsNavigator: React.FunctionComponent<any> = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'AndadaPro-Medium',
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
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
      <Stack.Screen
        name="Dev"
        component={Dev}
        options={{
          title: 'Dev',
          headerShown: true,
          presentation: 'containedModal',
        }}
      />
      <Stack.Screen
        name="ReadingGoals"
        component={ReadingGoals}
        options={{
          title: '',
          headerShown: true,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
