import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import Dev from '../components/screens/settings/screens/Dev';
import NotificationPreferences from '../components/screens/settings/screens/NotificationPreferences';
import Options from '../components/screens/settings/screens/Options';
import ReadingGoals from '../components/screens/settings/screens/ReadingGoals';
import Settings from '../components/screens/settings/Settings';
import { useAppSelector } from '../hooks';
import { t } from '../i18n/strings';

/**
 * Navigator storing all setting screens.
 *
 * @return {*}  {JSX.Element}
 */
const SettingsNavigator = (): JSX.Element => {
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
          headerLeft: () => (
            <Button
              onPress={() => console.log('here')}
              title="Back"
              color="#007AFF"
            />
          ),
          headerRight: () => (
            <Button
              onPress={() => console.log('here')}
              title="Save"
              color="#007AFF"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
