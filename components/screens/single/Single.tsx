import { useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import { useAppSelector } from '../../../hooks';
import { t } from '../../../i18n/strings';
import OptionsBtn from '../../common/OptionsBtn';
import P from '../../common/P';
import Rating from '../../common/Rating';
import Tag from '../../common/Tag';

const Single = ({ route }: any): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const pan = useRef(new Animated.ValueXY()).current;

  const testData = {
    bookId: '0394171349',
    tags: ['Game theory', 'Interpersonal relations', 'Social interaction'],
    rating: 4,
    note: 'My note for the book.',
    firstSentence:
      'OBSERVATION of spontaneous social activity, most productively carried out in certain kinds of psychotherapy groups, reveals that from time to time people show noticeable changes in posture, viewpoint, voice, vocabulary, and other aspects of behavior.',
  };

  return (
    //  https://dev.to/reime005/image-scroll-zoom-in-react-native-29f7
    <ScrollView
      style={{ backgroundColor: colors.background, ...styles.container }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: pan.y } } }],
        {
          useNativeDriver: false,
        },
      )}>
      {/* Cover image */}
      <View
        style={{
          backgroundColor: colors.accent,
          ...styles.coverContainer,
        }}>
        <Animated.Image
          resizeMode="cover"
          style={{
            transform: [
              {
                translateY: pan.y.interpolate({
                  inputRange: [-1000, 0],
                  outputRange: [-100, 0],
                  extrapolate: 'clamp',
                }),
              },
              {
                scale: pan.y.interpolate({
                  inputRange: [-3000, 0],
                  outputRange: [20, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
          source={require('../../../assets/images/bookCoverTest.jpg')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            console.log('btn');
          }}
          style={{
            backgroundColor: colors.textBtn,
            ...styles.mainButton,
          }}>
          <P color="white" size={20}>
            Add to read later
          </P>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: colors.background,
          ...styles.detailsContainer,
        }}>
        {/* Title */}
        <P size={18}>{route.params.title}</P>
        {/* Author & ID */}
        <View style={styles.author}>
          <P color={colors.text2} size={12}>
            {route.params.author_name}
          </P>
          <P color={colors.text3} size={12}>
            {testData.bookId}
          </P>
        </View>
        {/* Tags */}
        <View style={styles.tags}>
          {testData.tags.map((item, index) => (
            <Tag key={index} text={item} index={index} />
          ))}
        </View>
        {/* Rating */}
        <P color={colors.placeholder} size={16}>
          {t.single1}
        </P>
        <View style={{ marginTop: 0, ...styles.tags }}>
          <Rating rating={3} />
        </View>
        {/* Mark as button */}
        <OptionsBtn
          text="Mark as..."
          modalTexts={['Reread', 'Read Once', 'Read Later', 'Not Read']}
          modalActions={[
            () => console.log('Reread'),
            () => console.log('Read Once'),
            () => console.log('Read Later'),
            () => console.log('Not Read'),
          ]}
        />
        {/* Personal note */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            ...styles.tags,
          }}>
          <P size={16}>{t.single3}</P>
          <P size={16} color={colors.textBtn}>
            {t.single4}
          </P>
        </View>
        <P size={14} color={colors.placeholder}>
          {testData.note}
        </P>
        {/* Description */}
        <View style={styles.desc}>
          <P size={16}>{t.single5}</P>
          <P size={14} color={colors.placeholder}>
            {testData.firstSentence}
          </P>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 15,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    transform: [{ translateY: -20 }],
  },
  mainButton: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
  },
  desc: {
    marginVertical: 15,
  },
});

export default Single;
