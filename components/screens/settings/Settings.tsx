import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../hooks';
import { t } from '../../../i18n/strings';
import { RouterProps } from '../../../interfaces/Navigation';
import sql from '../../../services/sql/sql';
import P from '../../common/P';
import SettingsBtn from './components/SettingsBtn';

/**
 * The main settings screen, gives access to all options.
 *
 * @param {RouterProps} { navigation }
 * @return {*}  {JSX.Element}
 */
const Settings = ({ navigation }: RouterProps): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
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
      <SettingsBtn
        icon="options-outline"
        text={'insert book into list'}
        action={() =>
          sql.saveBookToList({
            list: 'current',
            bookId: '/works/OL17837119W',
            title: '12 Rules for Life',
            author_name: 'Jordan B. Peterson',
            number_of_pages_median: '123',
            isbn: '9780241351659',
          })
        }
      />
      <SettingsBtn
        icon="options-outline"
        text={'log books in lists'}
        action={() => sql.getBooksInList('current')}
      />
      <SettingsBtn
        icon="options-outline"
        text={'clear data from list table'}
        action={() => sql.clearListTable()}
      />
      <SettingsBtn
        icon="options-outline"
        text={'drop table'}
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
