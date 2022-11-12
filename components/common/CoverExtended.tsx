import {
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { navigate } from 'helpers/Navigate';
import { useAppSelector } from 'hooks';
import P from './P';
import CoverImage from './CoverImage';

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

  const h = Dimensions.get('window').height * 0.25;
  const w = Dimensions.get('window').width * 0.3;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          backgroundColor: colors.white,
          ...styles.container,
        },
      ]}
      onPress={() => navigate('Single', item.item)}>
      <CoverImage width={w} height={h} cover={item.item.cover_i} />
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
            {`pages: ${
              item.item.number_of_pages_median
                ? item.item.number_of_pages_median
                : 'N/A'
            }`}
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
    paddingVertical: 5,
    borderRadius: 5,
  },
  info: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 1,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  infoTop: {
    width: 'auto',
    flex: 1,
  },
});

export default CoverExtended;
