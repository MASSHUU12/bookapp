import { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { navigate } from '../../../../helpers/Navigate';
import { useAppSelector, useGlobalState } from '../../../../hooks';
import sql from '../../../../services/sql/sql';
import { ListType } from '../../../../types/listType';
import P from '../../../common/P';

interface Props {
  name: string;
  number_of_books: number;
  image: string; // For now
  list_name: ListType;
}

const ListItem = ({ name, image, list_name }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const [numberOfBooks, setNumberOfBooks] = useState(0);
  const [update, setUpdate] = useGlobalState();

  useEffect(() => {
    sql.countBooksInList(list_name, bookCount => {
      setNumberOfBooks(bookCount);
    });
  }, [update]);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: colors.white,
          ...styles.container,
        },
      ]}
      onPress={() =>
        navigate('ListsRecords', { name: name, list_name: list_name })
      }>
      <Image
        style={styles.image}
        source={require('../../../../assets/images/bookCoverTest.jpg')}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <P>{name}</P>
        <P size={14} color={colors.text2}>
          {numberOfBooks + ' books'}
        </P>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  info: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 15,
    flexShrink: 1,
  },
  image: {
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').width * 0.2,
    borderRadius: 5,
  },
});

export default ListItem;
