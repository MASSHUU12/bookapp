import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import api from '../../../../services/api/api';
import CoverExtended from '../../../common/CoverExtended';
import P from '../../../common/P';
import { debounce as _ } from 'underscore';

const Search = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any>([]);

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
                ListFooterComponent={<View style={{ marginBottom: 25 }}></View>}
                data={searchResults}
                renderItem={item => <CoverExtended item={item} />}
              />
            </>
          ) : (
            <P color={colors.placeholder}>
              Start writing and we will do our best to find what you are looking
              for.
            </P>
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
});

export default Search;
