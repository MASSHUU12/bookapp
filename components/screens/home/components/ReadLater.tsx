import { FlatList, View, StyleSheet } from 'react-native';
import Cover from '../../../common/Cover';
import P from '../../../common/P';
import { t } from '../../../../i18n/strings';
import { useEffect, useState } from 'react';
import { useAppSelector, useGlobalState } from '../../../../hooks';
import sql from '../../../../services/sql/sql';

/**
 * A component that displays books from a to-read list.
 *
 * @return {*}  {JSX.Element}
 */
const ReadLater = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [state] = useGlobalState();

  const colors = useAppSelector(state => state.theme.colors);

  useEffect(() => {
    sql.getBooksInList('readLater', allBooksInList => {
      setData(allBooksInList);
    });
  }, [state]);

  return (
    <View style={styles.container}>
      <P>{t.readLater1}</P>
      {/* If list is empty display placeholder. */}
      {data.length <= 0 ? (
        <View style={{ minHeight: 150, marginTop: 10 }}>
          <P size={14} color={colors.text2}>
            {t.readLater2}
          </P>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          horizontal
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={{ marginLeft: 10 }} />
          )}
          data={data}
          renderItem={item => <Cover item={item} />}
        />
      )}
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
