import { View, StyleSheet } from 'react-native';
// import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import P from '../../../common/P';

const Stats = (): JSX.Element => {
  // const chartConfig = {
  //   backgroundGradientFrom: '#1E2923',
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: '#08130D',
  //   backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  //   strokeWidth: 2, // optional, default 3
  //   barPercentage: 0.5,
  //   useShadowColorFromDataset: false, // optional
  // };

  return (
    <View style={styles.container}>
      <P>Your stats</P>
      {/* <ProgressChart
        data={{
          labels: ['AAA', 'BBB'],
          data: [0.3, 0.5],
        }}
        width={Dimensions.get('window').width}
        height={220}
        strokeWidth={10}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={true}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});

export default Stats;
