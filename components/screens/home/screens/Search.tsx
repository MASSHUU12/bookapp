import { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import CoverExtended from '../../../common/CoverExtended';
import P from '../../../common/P';

const Search = () => {
  const colors = useAppSelector(state => state.theme.colors);
  const [text, setText] = useState('');

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
          onChangeText={setText}
          value={text}
          autoFocus
        />
      </View>
      <P size={14} color={colors.placeholder}>
        We found 3 results
      </P>
      <FlatList
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={{ marginTop: 15 }} />
        )}
        data={[
          {
            id: 0,
            title: 'The Art Of Extraordinary Confidence',
          },
          {
            id: 1,
            title: '12 Months To $1 Million',
          },
          {
            id: 2,
            title: 'The Subtle Art of Not Giving a F*ck',
          },
          {
            id: 3,
            title: 'Title',
          },
        ]}
        renderItem={item => <CoverExtended item={item} />}
      />
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
