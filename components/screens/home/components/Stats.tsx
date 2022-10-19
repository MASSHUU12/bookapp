import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import P from '../../../common/P';
import { t } from '../../../../i18n/strings';
import { useAppSelector } from '../../../../hooks';
import { navigate } from '../../../../helpers/Navigate';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { commonStyles } from '../../../../styles/commonStyles';

/**
 * Component displaying user statistics.
 *
 * @return {*}  {JSX.Element}
 */
const Stats = (): JSX.Element => {
  const targetMonth = useAppSelector(
    state => state.targets.value.targetPerMonth,
  );
  const targetYear = useAppSelector(state => state.targets.value.targetPerYear);
  const colors = useAppSelector(state => state.theme.colors);

  const booksThisMonth = 21;
  const booksThisYear = 69;

  const config = {
    size: Dimensions.get('window').width / 3,
    tintColor: colors.text4,
    width: 15,
    backgroundColor: colors.placeholder,
    rotation: -90,
    arcSweepAngle: 180,
  };

  return (
    <Pressable onPress={() => navigate('Stats')}>
      <P>{t.stats1}</P>
      <View
        style={{
          ...commonStyles.flexCenter,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 15,
        }}>
        {/* Month */}
        <AnimatedCircularProgress
          {...config}
          fill={(booksThisMonth * 100) / parseInt(targetMonth)}
          onAnimationComplete={() => console.log(targetMonth)}
          lineCap="round">
          {() => (
            <View style={{ ...commonStyles.flexCenter }}>
              <P size={12} color={colors.placeholder}>
                {t.miscMonth.toLowerCase()}
              </P>
              <P>{`${booksThisMonth}`}</P>
              <P
                size={12}
                color={
                  colors.placeholder
                }>{`${t.miscTarget}: ${targetMonth}`}</P>
            </View>
          )}
        </AnimatedCircularProgress>
        {/* Year */}
        <AnimatedCircularProgress
          {...config}
          fill={(booksThisYear * 100) / parseInt(targetYear)}
          onAnimationComplete={() => console.log(targetYear)}
          lineCap="round">
          {() => (
            <View style={{ ...commonStyles.flexCenter }}>
              <P size={12} color={colors.placeholder}>
                {t.miscYear.toLowerCase()}
              </P>
              <P>{`${booksThisYear}`}</P>
              <P
                size={12}
                color={
                  colors.placeholder
                }>{`${t.miscTarget}: ${targetYear}`}</P>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
  dots: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

export default Stats;
