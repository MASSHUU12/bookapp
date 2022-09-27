import { FlatList, View, StyleSheet } from 'react-native';
import Cover from '../../../common/Cover';
import P from '../../../common/P';
import { t } from '../../../../i18n/strings';

const ReadLater = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <P>{t.readLater1}</P>
      <FlatList
        style={styles.list}
        horizontal
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={{ marginLeft: 0 }} />
        )}
        data={[
          {
            id: 0,
            title: 'Title',
          },
          {
            id: 1,
            title: 'Title',
          },
          {
            id: 2,
            title: 'Title',
          },
          {
            id: 3,
            title: 'Title',
          },
        ]}
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
