import { FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from '../../../hooks';
import { t } from '../../../i18n/strings';
import P from '../../common/P';
import ListItem from './components/ListItem';

const Lists = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  // Test data
  const data = [
    {
      name: 'Read later',
      number_of_books: 9,
      image: '',
      list_name: 'read_later',
    },
    {
      name: 'Currently reading',
      number_of_books: 69,
      image: '',
      list_name: 'currently_reading',
    },
    {
      name: 'Already read',
      number_of_books: 18,
      image: '',
      list_name: 'already_read',
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={
        <P size={24} styles={{ marginBottom: 15 }}>
          {t.lists1}
        </P>
      }
      style={{ backgroundColor: colors.background, ...styles.container }}
      data={data}
      renderItem={({ item }) => (
        <ListItem
          name={item.name}
          number_of_books={item.number_of_books}
          image={item.image}
          list_name={item.list_name}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default Lists;
