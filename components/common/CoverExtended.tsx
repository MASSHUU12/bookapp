import {
  Image,
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { useAppSelector } from '../../hooks';
import P from './P';

interface Props {
  item: ListRenderItemInfo<{
    id: number;
    title: string;
    author_name: string;
    number_of_pages_median: string;
  }>;
}

const CoverExtended = ({ item }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <Pressable
      style={{ backgroundColor: colors.white, ...styles.container }}
      onPress={() => console.log(item.item.title)}>
      <Image
        style={styles.image}
        source={require('../../assets/images/bookCoverTest.jpg')}
        resizeMode="contain"
        // TODO: loadingIndicatorSource={}
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
  },
});

export default CoverExtended;
