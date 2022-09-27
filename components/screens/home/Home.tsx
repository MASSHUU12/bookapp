import { StyleSheet, ScrollView } from 'react-native';
import P from '../../common/P';
import Stats from './components/Stats';

/**
 * Home screen
 *
 * @return {*}  {JSX.Element}
 */
const Home = (): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <P size={14}>Welcome back</P>
      <P size={24} font="AndadaPro-Bold">
        Start your reading
      </P>
      <Stats />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    padding: 25,
    paddingBottom: 0,
  },
});

export default Home;
