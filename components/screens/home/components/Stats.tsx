import { View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import P from '../../../common/P';
import { t } from '../../../../i18n/strings';

const Stats = (): JSX.Element => {
  const chartConfig = {
    backgroundGradientFrom: '#F8F8F8',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#F8F8F8',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(159, 159, 159, ${opacity})`,
    useShadowColorFromDataset: false,
  };

  return (
    <View>
      <P>{t.stats1}</P>
      <ProgressChart
        data={{
          labels: [t.miscYear, t.miscMonth],
          data: [0.6, 0.4],
        }}
        width={Dimensions.get('window').width * 0.75}
        height={Dimensions.get('window').height * 0.2}
        strokeWidth={12}
        radius={16}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
};

export default Stats;
