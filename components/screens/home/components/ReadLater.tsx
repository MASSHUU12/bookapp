import { FlatList, View, StyleSheet } from 'react-native';
import Cover from '../../../common/Cover';
import P from '../../../common/P';
import { t } from '../../../../i18n/strings';
import { useEffect, useState } from 'react';
import { useGlobalState } from '../../../../hooks';
import sql from '../../../../services/sql/sql';

/**
 * A component that displays books from a to-read list.
 *
 * @return {*}  {JSX.Element}
 */
const ReadLater = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    sql.getBooksInList('readLater', allBooksInList => {
      setData(allBooksInList);
    });
  }, [state]);

  return (
    <View style={styles.container}>
      <P>{t.readLater1}</P>
      <FlatList
        style={styles.list}
        horizontal
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={{ marginLeft: 10 }} />
        )}
        data={data}
        renderItem={item => <Cover item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  list: {
    marginTop: 15,
  },
});

export default ReadLater;
