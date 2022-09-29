import { FlatList, View, StyleSheet } from 'react-native';
import { t } from '../../../../i18n/strings';
import CoverExtended from '../../../common/CoverExtended';
import P from '../../../common/P';

/**
 * A component that displays the books user are currently reading.
 *
 * @return {*}  {JSX.Element}
 */
const CurrentReads = (): JSX.Element => {
  return (
    <View>
      <P>{t.currentReads1}</P>
      <FlatList
        style={styles.header}
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
  header: {
    marginTop: 10,
    marginBottom: 25,
  },
});

export default CurrentReads;
