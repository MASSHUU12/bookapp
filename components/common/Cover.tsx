import { Dimensions, Image, ListRenderItemInfo, Pressable } from 'react-native';
import { navigate } from '../../helpers/Navigate';
import CoverImage from './CoverImage';

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
  const h = Dimensions.get('window').height * 0.2;
  const w = 110;

  return (
    <Pressable
      key={item.item.isbn}
      onPress={() => navigate('Single', item.item)}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}>
      <CoverImage width={w} height={h} cover={item.item.cover_i} />
    </Pressable>
  );
};

export default Cover;
