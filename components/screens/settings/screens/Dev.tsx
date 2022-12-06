import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'hooks';
import sql from 'services/sql/sql';
import SettingsBtn from '../components/SettingsBtn';

import { navigate } from 'helpers/Navigate';
import { getItem, setItem } from 'helpers/Storage';
import { log } from 'helpers/log';

/**
 * Development options.
 *
 * @return {*}  {JSX.Element}
 */
const Dev: React.FunctionComponent<any> = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      <SettingsBtn
        icon="hammer-outline"
        text={'clear data from list table'}
        action={() => sql.clearListTable()}
      />
      <SettingsBtn
        icon="hammer-outline"
        text={'drop all tables'}
        action={() => sql.dropAllTables()}
      />
      <SettingsBtn
        icon="hammer-outline"
        text={'console.log details'}
        action={() => sql.selectAllFromDetails()}
      />
      <SettingsBtn
        icon="hammer-outline"
        text={'console.log books in current list'}
        action={() =>
          sql.getBooksInList('current', res => {
            log(res);
          })
        }
      />
      <SettingsBtn
        icon="hammer-outline"
        text="Move to welcome screen"
        action={() => navigate('Other', { screen: 'Welcome' })}
      />
      <SettingsBtn
        icon={'hammer-outline'}
        text={'Toggle logs'}
        action={() => {
          getItem('logsEnabled').then(name => {
            setItem('logsEnabled', name === 'true' ? 'false' : 'true').catch(
              e => log(e),
            );
          });
        }}
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

export default Dev;
