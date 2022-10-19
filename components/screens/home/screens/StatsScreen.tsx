import { Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import { commonStyles } from '../../../../styles/commonStyles';
import P from '../../../common/P';

const StatsScreen = (): JSX.Element => {
  const targetMonth = useAppSelector(
    state => state.targets.value.targetPerMonth,
  );
  const targetYear = useAppSelector(state => state.targets.value.targetPerYear);
  const colors = useAppSelector(state => state.theme.colors);

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

  const dataMonths = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        data: [20, 45, 28, 80],
      },
    ],
  };

  const dataYears = {
    labels: ['2019', '2020', '2021', '2022'],
    datasets: [
      {
        data: [230, 189, 420, 69],
      },
    ],
  };

  return (
    <ScrollView style={{ ...commonStyles.basicScreen }}>
      <P>{t.stats1}</P>
      <BarChart
        data={dataMonths}
        width={Dimensions.get('window').width - 50}
        height={220}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        yAxisLabel=""
        yAxisSuffix=""
      />
      <P size={14} color={colors.text2}>{`${t.stats2}: ${targetMonth}`}</P>
      <BarChart
        data={dataYears}
        width={Dimensions.get('window').width - 50}
        height={220}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        yAxisLabel=""
        yAxisSuffix=""
      />
      <P size={14} color={colors.text2}>{`${t.stats3}: ${targetYear}`}</P>
    </ScrollView>
  );
};

export default StatsScreen;
