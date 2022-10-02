import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector, useGlobalState } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import api from '../../../../services/api/api';
import CoverExtended from '../../../common/CoverExtended';
import P from '../../../common/P';
import { debounce as _ } from 'underscore';
import NavLink from '../../../common/NavLink';
import sql from '../../../../services/sql/sql';

/**
 * Search screen.
 *
 * @return {*}  {JSX.Element}
 */
const Search = (): JSX.Element => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [state, dispatch] = useGlobalState();

  const colors = useAppSelector(state => state.theme.colors);

  // Debounced version of search function.
  const search = _(
    () => {
      if (text.length > 2) {
        setLoading(true);

        api.search(text).then(res => {
          setSearchResults(res.data.docs);
          setLoading(false);
        });
        return 0;
      }
      setLoading(false);
      setSearchResults([]);
    },
    500,
    false,
  );

  const showConfirmDialog = (item: any) => {
    return Alert.alert(item.item.title, 'Add to list', [
      // The "Yes" button
      {
        text: 'Add to current',
        onPress: () => {
          sql.saveBookToList({
            list: 'current',
            bookId: item.item.id,
            title: item.item.title,
            author_name: item.item.author_name,
            number_of_pages_median: item.item.number_of_pages_median,
            isbn: item.item.isbn[0],
            cover_i: item.item.cover_i,
          });
          dispatch(1);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'Add to read later',
        onPress: () => {
          sql.saveBookToList({
            list: 'readLater',
            bookId: item.item.id,
            title: item.item.title,
            author_name: item.item.author_name,
            number_of_pages_median: item.item.number_of_pages_median,
            isbn: item.item.isbn[0],
            cover_i: item.item.cover_i,
          });
          dispatch(1);
        },
      },
      {
        text: 'Dismiss',
      },
    ]);
  };

  // ! Issue: #8
  useEffect(() => {
    search();
  }, [text]);

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      <View style={{ backgroundColor: colors.surface, ...styles.searchBar }}>
        <Ionicons
          name="search"
          size={24}
          color={colors.placeholder}
          style={styles.icon}
        />
        <TextInput
          style={{ color: colors.placeholder, ...styles.searchBarText }}
          placeholder={t.search1}
          placeholderTextColor={colors.placeholder}
          onChangeText={setText}
          value={text}
          autoFocus
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.placeholder} />
      ) : (
        <>
          {text.length > 0 ? (
            <>
              <P size={14} color={colors.placeholder}>
                {`We found ${searchResults.length} results`}
              </P>
              <FlatList
                ItemSeparatorComponent={({ highlighted }) => (
                  <View style={{ marginTop: 15 }} />
                )}
                ListHeaderComponent={<View style={{ marginBottom: 25 }}></View>}
                ListFooterComponent={
                  <View style={styles.footer}>
                    <P color={colors.placeholder}>{t.search2}</P>
                    <NavLink text={t.search3} target="Home" />
                  </View>
                }
                data={searchResults}
                renderItem={item => (
                  <CoverExtended
                    item={item}
                    onPress={() => {
                      showConfirmDialog(item);
                    }}
                  />
                )}
              />
            </>
          ) : (
            <View style={styles.beforeSearching}>
              <P color={colors.placeholder}>{t.search4}</P>
              <P color={colors.placeholder}>{t.search5}</P>
              <NavLink text={t.search3} target="Home" />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  searchBar: {
    width: '100%',
    height: 'auto',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15,
    marginBottom: '15%',
  },
  searchBarText: {
    fontFamily: 'AndadaPro-Medium',
    fontSize: 14,
    width: '100%',
  },
  icon: {
    paddingHorizontal: 15,
  },
  footer: {
    marginVertical: 25,
    flex: 1,
    alignItems: 'center',
  },
  beforeSearching: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Search;
