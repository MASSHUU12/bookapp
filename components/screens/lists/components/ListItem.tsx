import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { navigate } from '../../../../helpers/Navigate';
import { useAppSelector, useGlobalState } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import sql from '../../../../services/sql/sql';
import { ListType } from '../../../../types/listType';
import P from '../../../common/P';

interface Props {
  name: string;
  number_of_books: number;
  image: any;
  list_name: ListType;
}

const ListItem = ({ name, image, list_name }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const [numberOfBooks, setNumberOfBooks] = useState(0);
  const [update] = useGlobalState();

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
      {image}
      <View style={styles.info}>
        <P>{name}</P>
        <P size={14} color={colors.text2}>
          {`${numberOfBooks} ${t.lists2}`}
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
});

export default ListItem;
