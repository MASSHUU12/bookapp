import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useAppSelector, useGlobalState } from '../../../hooks';
import { t } from '../../../i18n/strings';
import sql from '../../../services/sql/sql';
import { DetailedBookType } from '../../../types/detailedBookType';
import P from '../../common/P';
import MainActionButton from './components/MainActionButton';
import CoverImage from '../../common/CoverImage';

import TagsSection from './sections/TagsSection';
import RatingSection from './sections/RatingSection';
import MarkAsSection from './sections/MarkAsSection';
import AuthorSection from './sections/AuthorSection';

const Single = ({ route }: any): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const [onRefresh, dispatch] = useGlobalState();

  const [sqlBookData, setSqlBookData] = useState<{} | DetailedBookType>({});
  const [tags, setTags] = useState<any>([]);

  const h = Dimensions.get('window').height * 0.4;
  const w = Dimensions.get('window').width * 0.5;

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
        <CoverImage width={w} height={h} cover={route.params.cover_i} />
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
