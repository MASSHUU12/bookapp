import { StyleSheet, ScrollView } from 'react-native';
import P from '../../common/P';
import Search from './components/Search';
import ReadLater from './components/ReadLater';
import Stats from './components/Stats';
import { t } from '../../../i18n/strings';
import CurrentReads from './components/CurrentReads';

/**
 * Home screen
 *
 * @return {*}  {JSX.Element}
 */
const Home = (): JSX.Element => {
  return (
    <ScrollView nestedScrollEnabled style={styles.container}>
      <P size={14}>{t.home1}</P>
      <P size={24} font="AndadaPro-Bold">
        {t.home2}
      </P>
      <Search />
      <Stats />
      <ReadLater />
      <CurrentReads />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default Home;
