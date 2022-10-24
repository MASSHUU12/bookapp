import { View } from 'react-native';
import Config from 'react-native-config';
import { navigate } from 'helpers/Navigate';
import { useAppSelector } from 'hooks';
import { t } from 'i18n/strings';
import { commonStyles } from 'styles/commonStyles';
import SettingsBtn from './components/SettingsBtn';
import P from '@common/P';

/**
 * The main settings screen, gives access to all options.
 *
 * @return {*}  {JSX.Element}
 */
const Settings = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View
      style={{
        backgroundColor: colors.background,
        ...commonStyles.basicScreen,
      }}>
      <P size={24}>{t.nav5}</P>
      <SettingsBtn
        icon="book-outline"
        text={t.settings1}
        action={() => navigate('ReadingGoals')}
      />
      <SettingsBtn
        icon="notifications-outline"
        text={t.settings2}
        action={() => navigate('NotificationPreferences')}
      />
      <SettingsBtn
        icon="options-outline"
        text={t.settings3}
        action={() => navigate('Options')}
      />
      {Config.PRODUCTION !== 'true' && (
        <SettingsBtn
          icon="flask-outline"
          text={'Dev'}
          action={() => navigate('Dev')}
        />
      )}
    </View>
  );
};

export default Settings;
