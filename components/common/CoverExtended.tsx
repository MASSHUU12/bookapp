import { useState } from 'react';
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
import NoImage from '../../assets/images/no_image_found.svg';

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
  const [err, setErr] = useState(false);

  const colors = useAppSelector(state => state.theme.colors);

  const h = Dimensions.get('window').height * 0.13;
  const w = Dimensions.get('window').height * 0.13;

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
      {!err ? (
        <Image
          style={{
            width: w,
            height: h,
          }}
          source={{
            uri: `https://covers.openlibrary.org/b/id/${item.item.cover_i}-M.jpg?default=false`,
          }}
          onError={() => setErr(true)}
          resizeMode="contain"
          // TODO: Need to be replaced with better image.
          loadingIndicatorSource={require('../../assets/images/bookCoverTest.jpg')}
        />
      ) : (
        <NoImage width={w} height={h} />
      )}
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
    paddingLeft: 2,
  },
  infoTop: {
    width: 'auto',
    flex: 1,
  },
});

export default CoverExtended;
