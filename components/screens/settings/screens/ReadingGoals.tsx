import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '../../../../hooks';
import Btn from '../../../common/Btn';
import Input from '../../../common/Input';
import P from '../../../common/P';

const ReadingGoals = (): JSX.Element => {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const colors = useAppSelector(state => state.theme.colors);

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      <View style={styles.section}>
        <P size={16} color={colors.text2}>
          How many books do you want to read this month?
        </P>
        <Input
          value={`${month}`}
          onChange={setMonth}
          keyboardType="numeric"
          redux={false}
        />
      </View>
      <View style={styles.section}>
        <P size={16} color={colors.text2}>
          How many books do you want to read this year?
        </P>
        <Input
          value={`${year}`}
          onChange={setYear}
          keyboardType="numeric"
          redux={false}
        />
      </View>
      <Btn text="Save targets" action={() => console.log('aaa')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
  section: {
    marginVertical: 15,
  },
});

export default ReadingGoals;
