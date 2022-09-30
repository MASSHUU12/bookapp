import { StyleSheet, View } from 'react-native';
import { navigate } from '../../../helpers/Navigate';
import { useAppSelector } from '../../../hooks';
import { t } from '../../../i18n/strings';
import { RouterProps } from '../../../interfaces/Navigation';
import sql from '../../../services/sql/sql';
import P from '../../common/P';
import SettingsBtn from './components/SettingsBtn';

/**
 * The main settings screen, gives access to all options.
 *
 * @return {*}  {JSX.Element}
 */
const Settings = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      <P size={24}>{t.nav4}</P>
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
      <SettingsBtn
        icon="options-outline"
        text={'clear data from list table'}
        action={() => sql.clearListTable()}
      />
      <SettingsBtn
        icon="options-outline"
        text={'drop list table'}
        action={() => sql.dropAlltables()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default Settings;
