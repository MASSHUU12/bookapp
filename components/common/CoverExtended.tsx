import {
  Image,
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import P from './P';

interface Props {
  item: ListRenderItemInfo<{
    id: number;
    title: string;
  }>;
}

const CoverExtended = ({ item }: Props): JSX.Element => {
  return (
    <Pressable
      style={styles.container}
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
          <P size={12} color="#5B5B5B">
            Dr. Aziz Gazipura
          </P>
        </View>
        <View>
          <P size={12} color="#5B5B5B">
            1h 12m (58%)
          </P>
          <P size={12} color="#979595">
            Audiobook
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 5,
  },
  info: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoTop: {
    width: '70%',
    flex: 1,
  },
  image: {
    height: Dimensions.get('window').height * 0.15,
  },
});

export default CoverExtended;
