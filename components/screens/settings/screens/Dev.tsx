import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../../hooks';
import sql from '../../../../services/sql/sql';
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

export default Dev;
