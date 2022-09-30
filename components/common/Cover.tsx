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
  }>;
}

/**
 * A component that displays the book cover.
 *
 * @param {Props} { item }
 * @return {*}  {JSX.Element}
 */
const Cover = ({ item }: Props): JSX.Element => {
  return (
    <Pressable key={item.item.id} onPress={() => navigate('Single')}>
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
