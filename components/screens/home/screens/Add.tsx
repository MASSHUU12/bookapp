import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  addAuthor,
  addCurrentPage,
  addLink,
  addNumberOfPages,
  addTitle,
} from '../../../../features/add/addSlice';
import { useAppSelector } from '../../../../hooks';
import Btn from '../../../common/Btn';
import Input from '../../../common/Input';
import P from '../../../common/P';

const Add = (): JSX.Element => {
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
        You're adding
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
          What is the title of your book?
        </P>
        <Input value={titleValue} onChange={addTitle} />
      </View>
      {/* Author */}
      <View style={styles.section}>
        <P color={colors.text2} size={14}>
          Who is the author of your book?
        </P>
        <Input value={authorValue} onChange={addAuthor} />
      </View>
      {/* Number of pages */}
      <View style={styles.section}>
        <P color={colors.text2} size={14}>
          How many pages does your book have?
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
          What page are you currently on?
        </P>
        <Input
          value={currentPageValue}
          onChange={addCurrentPage}
          keyboardType="numeric"
          placeholder="Skip this if you haven't started yet"
        />
      </View>
      {/* Link */}
      <View style={{ paddingBottom: 15, ...styles.section }}>
        <P color={colors.text2} size={14}>
          Link to your book
        </P>
        <Input value={linkValue} onChange={addLink} placeholder="Optional" />
      </View>
      <Btn text="Add" action={() => console.log('Add')} />
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
