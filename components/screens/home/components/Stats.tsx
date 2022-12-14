import { Dimensions, Pressable, View } from 'react-native';
import P from '@common/P';
import { t } from 'i18n/strings';
import { useAppSelector, useGlobalState } from 'hooks';
import { navigate } from 'helpers/Navigate';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { commonStyles } from 'styles/commonStyles';
import { useEffect, useState } from 'react';
import sql from 'services/sql/sql';
import { Log } from 'helpers/Log';

/**
 * Component displaying user statistics.
 *
 * @return {*}  {JSX.Element}
 */
const Stats: React.FunctionComponent<any> = (): JSX.Element => {
  // const targetMonth = useAppSelector(
  //   state => state.targets.value.targetPerMonth,
  // );
  // const targetYear = useAppSelector(state => state.targets.value.targetPerYear);
  const targetMonth = 10;
  const targetYear = 120;
  const colors = useAppSelector(state => state.theme.colors);

  const [booksThisMonth, setBooksThisMonth] = useState(0);
  const [booksThisYear, setBooksThisYear] = useState(0);

  const [onRefresh] = useGlobalState();

  const config = {
    size: Dimensions.get('window').width / 3,
    tintColor: colors.text4,
    width: 5,
    backgroundColor: colors.placeholder,
    rotation: -90,
    arcSweepAngle: 180,
  };

  useEffect(() => {
    Log.Info('Stats refreshed.');

    sql.getStatsForMonth({}, numberOfBooks => {
      setBooksThisMonth(numberOfBooks);
      setBooksThisYear(numberOfBooks);
    });
  }, [onRefresh]);

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
          onAnimationComplete={() => Log.Info('Completed.')}
          lineCap="round">
          {() => (
            <View style={{ ...commonStyles.flexCenter }}>
              <P size={12} color={colors.placeholder}>
                {t.miscMonth.toLowerCase()}
              </P>
              <P size={32}>{`${booksThisMonth}`}</P>
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
          onAnimationComplete={() => Log.Info('Completed.')}
          lineCap="round">
          {() => (
            <View style={{ ...commonStyles.flexCenter }}>
              <P size={12} color={colors.placeholder}>
                {t.miscYear.toLowerCase()}
              </P>
              <P size={32}>{`${booksThisYear}`}</P>
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

export default Stats;
