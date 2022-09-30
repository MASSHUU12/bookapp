import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { t } from '../../../../i18n/strings';
import api from '../../../../services/api/api';
import sql from '../../../../services/sql/sql';
import CoverExtended from '../../../common/CoverExtended';
import P from '../../../common/P';

/**
 * A component that displays the books user are currently reading.
 *
 * @return {*}  {JSX.Element}
 */
const CurrentReads = (): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    sql.getBooksInList('current', allBooksInList => {
      setData(allBooksInList);
    });
  }, []);

  return (
    <View>
      <P>{t.currentReads1}</P>
      <FlatList
        style={styles.header}
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={{ marginTop: 15 }} />
        )}
        data={data}
        renderItem={item => (
          <CoverExtended
            item={item}
            onPress={() => {
              console.log('pressed');
            }}
          />
        )}
      />
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
