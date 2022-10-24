import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Pressable } from 'react-native';
import P from '@common/P';
import { t } from 'i18n/strings';
import { useAppSelector } from 'hooks';
import { navigate } from 'helpers/Navigate';

/**
 * A search item that takes user to the actual search screen.
 *
 * @return {*}  {JSX.Element}
 */
const SearchBar = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Pressable
      style={{ backgroundColor: colors.surface, ...styles.container }}
      onPress={() => navigate('Search')}>
      <Ionicons
        name="search"
        size={24}
        color={colors.placeholder}
        style={styles.icon}
      />
      <P color={colors.placeholder} size={14}>
        {t.search1}
      </P>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderRadius: 5,
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

export default SearchBar;
