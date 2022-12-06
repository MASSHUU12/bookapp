import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useAppSelector, useGlobalState } from 'hooks';
import { t } from 'i18n/strings';
import sql from 'services/sql/sql';
import { BookType } from 'types/bookType';

import CoverExtended from '@common/CoverExtended';
import P from '@common/P';

/**
 * A component that displays the books user are currently reading.
 *
 * @return {*}  {JSX.Element}
 */
const CurrentReads: React.FunctionComponent<any> = (): JSX.Element => {
  const [data, setData] = useState<Array<BookType>>([]);
  const [state] = useGlobalState();

  const colors = useAppSelector(state => state.theme.colors);

  useEffect(() => {
    sql.getBooksInList('current', allBooksInList => {
      setData(allBooksInList);
    });
  }, [state]);

  return (
    <View>
      <P>{t.currentReads1}</P>
      {/* If list is empty display placeholder. */}
      {data.length <= 0 ? (
        <View style={{ minHeight: 150, marginTop: 10 }}>
          <P size={14} color={colors.text2}>
            {t.currentReads2}
          </P>
        </View>
      ) : (
        <FlatList
          style={styles.header}
          ItemSeparatorComponent={() => <View style={{ marginTop: 15 }} />}
          data={data}
          renderItem={item => <CoverExtended item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 25,
  },
});

export default CurrentReads;
