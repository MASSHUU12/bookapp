import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { useAppSelector, useGlobalState } from 'hooks';
import { t } from 'i18n/strings';
import sql from 'services/sql/sql';
import { DetailedBookType } from 'types/detailedBookType';
import MainActionButton from './components/MainActionButton';
import P from '@common/P';

import TagsSection from './sections/TagsSection';
import RatingSection from './sections/RatingSection';
import MarkAsSection from './sections/MarkAsSection';
import AuthorSection from './sections/AuthorSection';

const Single = ({ route }: any): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const pan = useRef(new Animated.ValueXY()).current;
  const [onRefresh, dispatch] = useGlobalState();

  const [sqlBookData, setSqlBookData] = useState<{} | DetailedBookType>({});
  const [tags, setTags] = useState<any>([]);
  const [image, setImage] = useState({
    uri: `https://covers.openlibrary.org/b/id/${route.params.cover_i}-M.jpg?default=false`,
  });

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

  useEffect(() => {
    sql.getSingleBookDetailedInfo(route.params.key, bookFromSql => {
      if (bookFromSql === null) return; // book not available locally

      setSqlBookData(bookFromSql);
      setTags([t[bookFromSql.list], ...JSON.parse(bookFromSql.user_tags)]);
    });
  }, [onRefresh]);

  return (
    <ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: pan.y } } }],
        {
          useNativeDriver: false,
        },
      )}
      style={{ backgroundColor: colors.background, ...styles.container }}>
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
          source={image}
          onError={() =>
            setImage(require('../../../assets/images/no_image_found.png'))
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
        <AuthorSection route={route} />
        {/* Tags */}
        <TagsSection tags={tags} bookData={sqlBookData} />
        {/* Rating */}
        <RatingSection bookData={sqlBookData} />
        {/* Mark as button */}
        <MarkAsSection bookData={sqlBookData} params={route.params} />
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
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 15,
  },
});

export default Single;
