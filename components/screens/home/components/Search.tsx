import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet } from 'react-native';
import P from '../../../common/P';
import { t } from '../../../../i18n/strings';

/**
 * Search component
 *
 * @return {*}  {JSX.Element}
 */
const Search = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="#9F9F9F" style={styles.icon} />
      <P color="#9F9F9F" size={14}>
        {t.search1}
      </P>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15,
  },
  icon: {
    paddingHorizontal: 15,
  },
});

export default Search;
