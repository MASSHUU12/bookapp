import { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { t } from '../../../../i18n/strings';
import CoverExtended from '../../../common/CoverExtended';
import P from '../../../common/P';

const Search = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="#9F9F9F" style={styles.icon} />
        <TextInput
          style={styles.searchBarText}
          placeholder={t.search1}
          onChangeText={setText}
          value={text}
          autoFocus
        />
      </View>
      <P size={14} color="#9F9F9F">
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
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 25,
  },
  searchBar: {
    width: '100%',
    height: 'auto',
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15,
    marginBottom: '15%',
  },
  searchBarText: {
    color: '#9F9F9F',
    fontFamily: 'AndadaPro-Medium',
    fontSize: 14,
    width: '100%',
  },
  icon: {
    paddingHorizontal: 15,
  },
});

export default Search;
