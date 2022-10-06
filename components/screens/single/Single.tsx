import { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Pressable,
  Alert,
} from 'react-native';
import { useAppSelector, useGlobalState } from '../../../hooks';
import { t } from '../../../i18n/strings';
import sql from '../../../services/sql/sql';
import { BookType } from '../../../types/bookType';
import OptionsBtn from '../../common/OptionsBtn';
import P from '../../common/P';
import Rating from '../../common/Rating';
import Tag from '../../common/Tag';
import MainActionButton from './components/MainActionButton';
import MoreOptionsList from './components/MoreOptionsList';

const Single = ({ route }: any): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const pan = useRef(new Animated.ValueXY()).current;
  const [state, dispatch] = useGlobalState();
  const [sqlBookData, setSqlBookData] = useState<{} | BookType>({});

  const testData = {
    tags: ['Game theory', 'Interpersonal relations', 'Social interaction'],
    note: 'My note for the book.',
    firstSentence:
      'OBSERVATION of spontaneous social activity, most productively carried out in certain kinds of psychotherapy groups, reveals that from time to time people show noticeable changes in posture, viewpoint, voice, vocabulary, and other aspects of behavior.',
  };

  const handleMainButton = () => {
    sql.saveBookToList({
      list: 'readLater',
      bookId: route.params.key,
      title: route.params.title,
      author_name: route.params.author_name,
      number_of_pages_median: route.params.number_of_pages_median,
      isbn: route.params.isbn[0],
      cover_i: route.params.cover_i,
    });
    dispatch(1);
  };

  const handleCurrent = () => {
    sql.saveBookToList({
      list: 'current',
      bookId: route.params.key,
      title: route.params.title,
      author_name: route.params.author_name,
      number_of_pages_median: route.params.number_of_pages_median,
      isbn: route.params.isbn[0],
      cover_i: route.params.cover_i,
    });
    dispatch(1);
  };

  const handleRemoveBookFromHistory = () => {
    return Alert.alert(
      'Are your sure?',
      'Removing a book from history is irreversible',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            sql.removeBookFromHistory(route.params.key);
            dispatch(1);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const onRatingChange = (rating: number) => {
    if (!('key' in sqlBookData)) return;

    console.log(rating);
    sql.updateBookDetails({
      book_key: sqlBookData.key,
      field: 'user_rating',
      value: rating,
    });
  };

  useEffect(() => {
    sql.getSingleBookDetailedInfo(route.params.key, bookFromSql => {
      if (bookFromSql === null) return; // book not available locally

      console.log('Book found in sql:', bookFromSql.list);
      setSqlBookData(bookFromSql);
    });
  }, []);

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
            minWidth: 200,
            height: 300,
          }}
          source={
            route.params.cover_i === undefined
              ? require('../../../assets/images/bookCoverTest.jpg')
              : {
                  uri: `https://covers.openlibrary.org/b/id/${route.params.cover_i}-M.jpg`,
                }
          }
        />
      </View>
      <MainActionButton bookData={sqlBookData} onNewBook={handleMainButton} />
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
            {route.params.key.split('/')[2]}
          </P>
        </View>
        {/* Tags */}
        <View style={styles.tags}>
          {testData.tags.map((item, index) => (
            <Tag key={index} text={item} index={index} />
          ))}
        </View>
        {/* Rating */}

        {'user_rating' in sqlBookData && (
          <>
            <P color={colors.placeholder} size={16}>
              {t.single1}
            </P>
            <View style={{ marginTop: 0, ...styles.tags }}>
              <Rating
                rating={sqlBookData.user_rating}
                onRatingChange={onRatingChange}
              />
            </View>
          </>
        )}
        {/* Mark as button */}
        <MoreOptionsList bookData={sqlBookData} />
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
    minHeight: 280,
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
