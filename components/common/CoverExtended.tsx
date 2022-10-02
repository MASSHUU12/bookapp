import {
  Image,
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { navigate } from '../../helpers/Navigate';
import { useAppSelector } from '../../hooks';
import P from './P';

interface Props {
  item: ListRenderItemInfo<{
    id: number;
    title: string;
    author_name: string;
    number_of_pages_median: string;
    isbn: Array<string>;
    cover_i: string;
  }>;
}

/**
 * A component that displays the cover with basic information about the book.
 *
 * @param {Props} { item }
 * @return {*}  {JSX.Element}
 */
const CoverExtended = ({ item }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const isbnCodes = item.item.isbn;
  const formatedIsbnCode = Array.isArray(isbnCodes) ? isbnCodes[0] : isbnCodes;

  return (
    <Pressable
      style={{ backgroundColor: colors.white, ...styles.container }}
      onPress={() =>
        // Here later only the ID of the book should be transmitted.
        navigate('Single', item.item)
      }>
      <Image
        style={styles.image}
        source={
          item.item.isbn === undefined
            ? require('../../assets/images/bookCoverTest.jpg')
            : {
                uri: `https://covers.openlibrary.org/b/id/${item.item.cover_i}-M.jpg`,
              }
        }
        resizeMode="contain"
        // TODO: Need to be replaced with better image.
        loadingIndicatorSource={require('../../assets/images/bookCoverTest.jpg')}
      />
      <View style={styles.info}>
        <View style={styles.infoTop}>
          <P size={14}>{item.item.title}</P>
          <P size={12} color={colors.text2}>
            {item.item.author_name}
          </P>
        </View>
        <View>
          <P size={12} color={colors.text2}>
            book
          </P>
          <P size={12} color={colors.text3}>
            {`pages: ${item.item.number_of_pages_median}`}
          </P>
        </View>
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
    paddingVertical: 10,
    borderRadius: 5,
  },
  info: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  infoTop: {
    width: 'auto',
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').width * 0.25,
  },
});

export default CoverExtended;
