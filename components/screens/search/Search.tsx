import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from 'hooks';
import { t } from 'i18n/strings';
import api from 'services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from 'styles/commonStyles';

import CoverExtended from '@common/CoverExtended';
import P from '@common/P';
import NavLink from '@common/NavLink';

/**
 * Search screen.
 *
 * @return {*}  {JSX.Element}
 */
const Search = (): JSX.Element => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>([]);

  const colors = useAppSelector(state => state.theme.colors);

  const onSearch = () => {
    api.search(text).then(res => {
      setSearchResults(res.data.docs);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);

    if (text.length < 2) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    const delaySearchTimeout = setTimeout(() => {
      onSearch();
    }, 700);

    return () => clearTimeout(delaySearchTimeout);
  }, [text]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.background,
          ...commonStyles.basicScreen,
        }}>
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
            onChangeText={value => setText(value)}
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
                  {`${t.search6} ${searchResults.length} ${
                    searchResults.length === 1 ? t.search8 : t.search7
                  }`}
                </P>
                <FlatList
                  ItemSeparatorComponent={({ highlighted }) => (
                    <View style={{ marginTop: 15 }} />
                  )}
                  ListHeaderComponent={
                    <View style={{ marginBottom: 25 }}></View>
                  }
                  ListFooterComponent={
                    <View style={styles.footer}>
                      <P color={colors.placeholder}>{t.search2}</P>
                      <NavLink text={t.search3} target="Home" />
                    </View>
                  }
                  data={searchResults}
                  renderItem={item => <CoverExtended item={item} />}
                />
              </>
            ) : (
              <View style={styles.beforeSearching}>
                <P color={colors.placeholder}>{t.search4}</P>
                <P color={colors.placeholder}>{t.search5}</P>
                <NavLink text={t.search3} target="Add" />
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
