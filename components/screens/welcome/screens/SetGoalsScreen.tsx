import { Dimensions, StyleSheet, View } from 'react-native';
import { useAppSelector } from 'hooks';
import { commonStyles } from 'styles/commonStyles';
import P from '@common/P';

const SetGoalsScreen = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={{ ...commonStyles.flexCenter, ...styles.container }}>
      <View style={{ marginBottom: 15 }}>
        <P>Set your goals</P>
      </View>
      <P size={14} color={colors.text3}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque maiores
        perferendis error, non hic quas dignissimos quo delectus.
      </P>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:
      Dimensions.get('window').width -
      commonStyles.basicScreen.paddingHorizontal * 2,
    height: '100%',
  },
  img: {
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height / 2,
  },
});
export default SetGoalsScreen;
