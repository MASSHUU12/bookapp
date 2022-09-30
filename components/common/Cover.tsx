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
    <Pressable key={item.item.isbn} onPress={() => navigate('Single')}>
      <Image
        style={styles.image}
        source={require('../../assets/images/bookCoverTest.jpg')}
        resizeMode="contain"
        // TODO: loadingIndicatorSource={}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('window').height * 0.25,
  },
});

export default Cover;
