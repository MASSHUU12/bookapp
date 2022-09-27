import {
  Dimensions,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
} from 'react-native';

interface Props {
  item: ListRenderItemInfo<{
    id: number;
    title: string;
  }>;
}

const Cover = ({ item }: Props) => {
  return (
    <Pressable key={item.item.id} onPress={() => console.log(item.item.title)}>
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
