import {
  Dimensions,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
} from 'react-native';
import { navigate } from '../../helpers/Navigate';

interface Props {
  item: ListRenderItemInfo<{
    id: number;
    title: string;
    isbn: string;
    cover_i: string;
  }>;
}

/**
 * A component that displays the book cover.
 *
 * @param {Props} { item }
 * @return {*}  {JSX.Element}
 */
const Cover = ({ item }: Props): JSX.Element => {
  const isbnCodes = item.item.isbn;
  const formatedIsbnCode = Array.isArray(isbnCodes) ? isbnCodes[0] : isbnCodes;

  return (
    <Pressable
      key={item.item.isbn}
      onPress={() => navigate('Single', item.item)}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}>
      <Image
        style={styles.image}
        source={
          item.item.cover_i === undefined
            ? require('../../assets/images/bookCoverTest.jpg')
            : {
                uri: `https://covers.openlibrary.org/b/id/${item.item.cover_i}-M.jpg`,
              }
        }
        resizeMode="cover"
        // TODO: loadingIndicatorSource={}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('window').height * 0.2,
    width: 110,
  },
});

export default Cover;
