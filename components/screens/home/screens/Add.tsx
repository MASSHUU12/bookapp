import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  addAuthor,
  addCurrentPage,
  addLink,
  addNumberOfPages,
  addTitle,
} from 'features/add/addSlice';
import { useAppSelector } from 'hooks';
import { t } from 'i18n/strings';
import { Log } from 'helpers/Log';

import Btn from '@common/Btn';
import Input from '@common/Input';
import P from '@common/P';

/**
 *
 *
 * @return {*}  {JSX.Element}
 */
const Add: React.FunctionComponent<any> = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const titleValue = useAppSelector(state => state.add.value.title);
  const authorValue = useAppSelector(state => state.add.value.author);
  const numberOfPagesValue = useAppSelector(
    state => state.add.value.number_of_pages,
  );
  const currentPageValue = useAppSelector(
    state => state.add.value.current_page,
  );
  const linkValue = useAppSelector(state => state.add.value.link);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, ...styles.container }}>
      <P color={colors.placeholder} size={16}>
        {t.add1}
      </P>
      {/* Preview */}
      <View style={{ backgroundColor: colors.white, ...styles.preview }}>
        <Image
          style={styles.image}
          source={require('../../../../assets/images/bookCoverTest.jpg')}
        />
        <View style={styles.info}>
          <View style={styles.infoTop}>
            <P size={14} color={colors.text}>
              {titleValue}
            </P>
            <P size={12} color={colors.text2}>
              {authorValue}
            </P>
          </View>
          <P
            size={12}
            color={
              colors.text2
            }>{`${currentPageValue}/${numberOfPagesValue}`}</P>
        </View>
      </View>
      {/* Title */}
      <View style={styles.section}>
        <P color={colors.text2} size={14}>
          {t.add2}
        </P>
        <Input value={titleValue} onChange={addTitle} />
      </View>
      {/* Author */}
      <View style={styles.section}>
        <P color={colors.text2} size={14}>
          {t.add3}
        </P>
        <Input value={authorValue} onChange={addAuthor} />
      </View>
      {/* Number of pages */}
      <View style={styles.section}>
        <P color={colors.text2} size={14}>
          {t.add4}
        </P>
        <Input
          value={numberOfPagesValue}
          onChange={addNumberOfPages}
          keyboardType="numeric"
        />
      </View>
      {/* Current page */}
      <View style={styles.section}>
        <P color={colors.text2} size={14}>
          {t.add5}
        </P>
        <Input
          value={currentPageValue}
          onChange={addCurrentPage}
          keyboardType="numeric"
          placeholder={t.add6}
        />
      </View>
      {/* Link */}
      <View style={{ paddingBottom: 15, ...styles.section }}>
        <P color={colors.text2} size={14}>
          {t.add7}
        </P>
        <Input value={linkValue} onChange={addLink} placeholder={t.add8} />
      </View>
      <Btn text={t.add9} action={() => Log('Add')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 25,
    flex: 1,
  },
  preview: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').width * 0.2,
  },
  info: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 1,
    paddingLeft: 15,
  },
  infoTop: {
    width: 'auto',
    flex: 1,
  },
  section: {
    marginTop: 15,
  },
});

export default Add;
