import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useAppSelector } from '../../../hooks';
import Btn from '../../common/Btn';
import P from '../../common/P';
import Rating from '../../common/Rating';
import Tag from '../../common/Tag';

const Single = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const testData = {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    author: 'Dr. Aziz Gazipura',
    bookId: '0394171349',
    tags: ['Game theory', 'Interpersonal relations', 'Social interaction'],
    rating: 4,
    note: 'My notes for the book',
    firstSentence:
      'OBSERVATION of spontaneous social activity, most productively carried out in certain kinds of psychotherapy groups, reveals that from time to time people show noticeable changes in posture, viewpoint, voice, vocabulary, and other aspects of behavior.',
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, ...styles.container }}>
      <View
        style={{
          backgroundColor: colors.accent,
          ...styles.coverContainer,
        }}>
        <Image source={require('../../../assets/images/bookCoverTest.jpg')} />
      </View>
      <View
        style={{
          backgroundColor: colors.background,
          ...styles.detailsContainer,
        }}>
        {/* Title */}
        <P size={18}>{testData.title}</P>
        {/* Author & ID */}
        <View style={styles.author}>
          <P color={colors.text2} size={12}>
            {testData.author}
          </P>
          <P color={colors.text2} size={12}>
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
        <P color={colors.placeholder} size={12}>
          Your rating
        </P>
        <View
          style={{
            marginTop: 0,
            alignItems: 'center',
            justifyContent: 'space-between',
            ...styles.tags,
          }}>
          <View style={{ marginTop: 0, ...styles.tags }}>
            <Rating rating={3} />
          </View>
          <P size={14} color="#2487AF">
            Edit rating
          </P>
        </View>
        {/* Mark as button */}
        <Btn text="Mark as..." />
        {/* Description */}
        <View style={styles.desc}>
          <P size={14}>First sentence</P>
          <P size={14} color="#9F9F9F">
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
