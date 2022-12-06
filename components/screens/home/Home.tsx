import { StyleSheet, FlatList, Pressable, View } from 'react-native';
import P from '@common/P';
import SearchBar from './components/SearchBar';
import ReadLater from './components/ReadLater';
import Stats from './components/Stats';
import { t } from 'i18n/strings';
import CurrentReads from './components/CurrentReads';
import { useAppSelector } from 'hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate } from 'helpers/Navigate';
import { commonStyles } from 'styles/commonStyles';

/**
 * Home screen.
 *
 * @return {*}  {JSX.Element}
 */
const Home: React.FunctionComponent<any> = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <FlatList
      nestedScrollEnabled
      style={{
        backgroundColor: colors.background,
        ...commonStyles.basicScreen,
      }}
      data={[0]}
      renderItem={() => {
        return (
          <>
            <View style={styles.header}>
              <View>
                <P size={14}>{t.home1}</P>
                <P size={24} font="AndadaPro-Bold">
                  {t.home2}
                </P>
              </View>
              <Pressable onPress={() => navigate('SettingsNavigator')}>
                <Ionicons
                  name={'ellipsis-vertical'}
                  size={24}
                  color={colors.placeholder}
                />
              </Pressable>
            </View>
            <SearchBar />
            <Stats />
            <ReadLater />
            <CurrentReads />
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Home;
