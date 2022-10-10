import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../../hooks';
import sql from '../../../../services/sql/sql';
import CoverExtended from '../../../common/CoverExtended';

const ListsRecords = ({ route }: any): JSX.Element => {
  const { name, list_name } = route.params;
  const colors = useAppSelector(state => state.theme.colors);
  const [data, setData] = useState<any>();

  useEffect(() => {
    sql.getBooksInList(list_name, booksFromSql => {
      setData(booksFromSql);
    });
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: colors.background, ...styles.container }}
      ItemSeparatorComponent={() => <View style={{ marginTop: 10 }} />}
      data={data}
      renderItem={item => <CoverExtended item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default ListsRecords;
