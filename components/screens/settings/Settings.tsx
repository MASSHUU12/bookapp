import { StyleSheet, View } from 'react-native';
import { toggleModal } from '../../../features/modal/modalSlice';
import { navigate } from '../../../helpers/Navigate';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { t } from '../../../i18n/strings';
import P from '../../common/P';
import SettingsBtn from './components/SettingsBtn';
import ReadingGoals from './screens/ReadingGoals';

/**
 * The main settings screen, gives access to all options.
 *
 * @return {*}  {JSX.Element}
 */
const Settings = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const dispatch = useAppDispatch();

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      <P size={24}>{t.nav5}</P>
      <SettingsBtn
        icon="book-outline"
        text={t.settings1}
        action={() => dispatch(toggleModal({ name: 'readingGoals', value: 1 }))}
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
        icon="flask-outline"
        text={'Dev'}
        action={() => navigate('Dev')}
      />
      <ReadingGoals />
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
