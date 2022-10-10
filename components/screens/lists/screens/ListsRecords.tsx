import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../../hooks';
import CoverExtended from '../../../common/CoverExtended';

const ListsRecords = ({ route }: any): JSX.Element => {
  const { name, list_name } = route.params;
  const colors = useAppSelector(state => state.theme.colors);

  const [data, setData] = useState<any>();

  // Test data
  const readLater = [
    {
      id: 0,
      title: 'qwerty',
      author_name: 'ytrewq',
      number_of_pages_median: '2137',
      isbn: ['', ''],
      cover_i: '',
    },
  ];
  const currentlyReading = [
    {
      id: 0,
      title: 'zaq12wsx',
      author_name: 'xxx',
      number_of_pages_median: '2137',
      isbn: ['', ''],
      cover_i: '',
    },
    {
      id: 1,
      title: '2131321',
      author_name: '11',
      number_of_pages_median: '1',
      isbn: ['', ''],
      cover_i: '',
    },
  ];
  const alreadyRead = [
    {
      id: 0,
      title: 'Lorem ipsum dolor sit amet',
      author_name: 'Lorem',
      number_of_pages_median: '2137',
      isbn: ['', ''],
      cover_i: '',
    },
    {
      id: 1,
      title: '1111111111111',
      author_name: '1',
      number_of_pages_median: '1',
      isbn: ['', ''],
      cover_i: '',
    },
    {
      id: 2,
      title: 'Q',
      author_name: 'q',
      number_of_pages_median: 'q',
      isbn: ['', ''],
      cover_i: '',
    },
  ];

  const getCorrectData = (): void => {
    if (list_name === 'read_later') setData(readLater);
    if (list_name === 'currently_reading') setData(currentlyReading);
    if (list_name === 'already_read') setData(alreadyRead);
  };

  useEffect(() => {
    getCorrectData();
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
