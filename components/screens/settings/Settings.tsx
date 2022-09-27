import { StyleSheet, View } from 'react-native';
import { t } from '../../../i18n/strings';
import P from '../../common/P';
import SettingsBtn from '../../common/SettingsBtn';

// TODO: change navigation type
const Settings = ({ navigation }: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <P size={24}>{t.nav4}</P>
      <SettingsBtn
        icon="book-outline"
        text={t.settings1}
        action={() => navigation.navigate('ReadingGoals')}
      />
      <SettingsBtn
        icon="notifications-outline"
        text={t.settings2}
        action={() => navigation.navigate('NotificationPreferences')}
      />
      <SettingsBtn
        icon="options-outline"
        text={t.settings3}
        action={() => navigation.navigate('Options')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default Settings;
