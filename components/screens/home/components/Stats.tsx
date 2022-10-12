import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import P from '../../../common/P';
import { t } from '../../../../i18n/strings';
import { useEffect, useState } from 'react';
import { getItem } from '../../../../helpers/Storage';
import { BarChart } from 'react-native-chart-kit';
import { useAppSelector } from '../../../../hooks';

/**
 * Component displaying user statistics.
 *
 * @return {*}  {JSX.Element}
 */
const Stats = (): JSX.Element => {
  const [targetMonth, setTargetMonth] = useState('0');
  const [targetYear, setTargetYear] = useState('0');

  const colors = useAppSelector(state => state.theme.colors);

  /**
   * Get user goals.
   *
   * @return {*}  {Promise<void>}
   */
  const getTargets = async (): Promise<void> => {
    await getItem('target_month').then(item => {
      setTargetMonth(item === null ? '0' : item);
    });

    await getItem('target_year').then(item => {
      setTargetYear(item === null ? '0' : item);
    });
  };

  useEffect(() => {
    getTargets();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };

  const slides = [
    {
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            data: [20, 45, 28, 80],
          },
        ],
      },
      text_under_chart: t.stats2,
      value_under_chart: targetMonth,
    },
    {
      data: {
        labels: ['2019', '2020', '2021', '2022'],
        datasets: [
          {
            data: [230, 189, 420, 69],
          },
        ],
      },
      text_under_chart: t.stats3,
      value_under_chart: targetYear,
    },
  ];

  return (
    <View>
      <P>{t.stats1}</P>
      <FlatList
        style={styles.container}
        data={slides}
        horizontal
        renderItem={({ item }): JSX.Element => {
          return (
            <View style={styles.item}>
              <BarChart
                data={item.data}
                width={Dimensions.get('window').width - 50}
                height={220}
                chartConfig={chartConfig}
                fromZero
                showValuesOnTopOfBars
                yAxisLabel=""
                yAxisSuffix=""
              />
              <P
                size={14}
                color={
                  colors.text2
                }>{`${item.text_under_chart}: ${item.value_under_chart}`}</P>
            </View>
          );
        }}
      />
      <View style={styles.dots}>
        <P size={24}>••</P>
      </View>
    </View>
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
