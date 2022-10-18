import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { useAppSelector, useGlobalState } from '../../../hooks';
import { t } from '../../../i18n/strings';
import sql from '../../../services/sql/sql';
import { DetailedBookType } from '../../../types/detailedBookType';
import P from '../../common/P';
import Rating from '../../common/Rating';
import Tag from '../../common/Tag';
import MainActionButton from './components/MainActionButton';
import MoreOptionsList from './components/MoreOptionsList';
import NoteModal from './components/NoteModal';
import TagsModal from './components/TagsModal';

const Single = ({ route }: any): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const pan = useRef(new Animated.ValueXY()).current;
  const [onRefresh, dispatch] = useGlobalState();
  const [sqlBookData, setSqlBookData] = useState<{} | DetailedBookType>({});
  const [tags, setTags] = useState<any>([]);

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

      setSqlBookData(bookFromSql);
      setTags([t[bookFromSql.list], 'Read again', 'Favourites']);
    });
  }, [onRefresh]);

  return (
    //  https://dev.to/reime005/image-scroll-zoom-in-react-native-29f7
    <ScrollView
      style={{ backgroundColor: colors.background, ...styles.container }}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: pan.y } } }],
        {
          useNativeDriver: false,
        },
      )}>
      <View
        style={{
          height: 300,
          width: '100%',
          position: 'absolute',
          top: -300,
          backgroundColor: colors.accent,
        }}></View>
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
                  outputRange: [-400, 0],
                  extrapolate: 'clamp',
                }),
              },
              {
                scale: pan.y.interpolate({
                  inputRange: [-3000, 0],
                  outputRange: [10, 1],
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
      <View style={{ backgroundColor: colors.background }}>
        <MainActionButton bookData={sqlBookData} onNewBook={handleMainButton} />
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
            {route.params.key.split('/')[2]}
          </P>
        </View>
        {/* Tags */}
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 0,
              ...styles.tags,
            }}>
            <P color={colors.placeholder} size={14}>
              {t.single15}
            </P>
            <TagsModal book={sqlBookData} />
          </View>
          <View style={{ ...styles.tags, marginTop: 0 }}>
            {tags.map((item, index) => (
              <Tag key={index} text={item} index={index} />
            ))}
          </View>
        </>
        {/* Rating */}
        {'user_rating' in sqlBookData && (
          <>
            <P color={colors.placeholder} size={14}>
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
        {'user_notes' in sqlBookData && (
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                ...styles.tags,
              }}>
              <P size={16}>{t.single3}</P>
              <NoteModal book={sqlBookData} />
            </View>
            <P size={14} color={colors.placeholder}>
              {sqlBookData.user_notes}
            </P>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 1,
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
