import { StyleSheet, ScrollView } from 'react-native';
import P from '../../common/P';
import SearchBar from './components/SearchBar';
import ReadLater from './components/ReadLater';
import Stats from './components/Stats';
import { t } from '../../../i18n/strings';
import CurrentReads from './components/CurrentReads';
import { useAppSelector } from '../../../hooks';

/**
 * Home screen.
 *
 * @return {*}  {JSX.Element}
 */
const Home = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <ScrollView
      nestedScrollEnabled
      style={{ backgroundColor: colors.background, ...styles.container }}>
      <P size={14}>{t.home1}</P>
      <P size={24} font="AndadaPro-Bold">
        {t.home2}
      </P>
      <SearchBar />
      <Stats />
      <ReadLater />
      <CurrentReads />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default Home;
