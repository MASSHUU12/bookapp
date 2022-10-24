import { StyleSheet, View } from 'react-native';
import { navigate } from 'helpers/Navigate';
import { useAppSelector } from 'hooks';
import sql from 'services/sql/sql';
import SettingsBtn from '../components/SettingsBtn';

const Dev = (): JSX.Element => {
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
        action={() => sql.dropAlltables()}
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
            console.log(res);
          })
        }
      />
      <SettingsBtn
        icon="hammer-outline"
        text="Move to welcome screen"
        action={() => navigate('Other', { screen: 'Welcome' })}
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
