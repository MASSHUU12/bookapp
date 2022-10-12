import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { setItem } from '../../../../helpers/Storage';
import { useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import Btn from '../../../common/Btn';
import Input from '../../../common/Input';
import P from '../../../common/P';

const ReadingGoals = (): JSX.Element => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const colors = useAppSelector(state => state.theme.colors);

  const saveGoals = async () => {
    await setItem('target_month', month);
    await setItem('target_year', year);
  };

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      <View style={styles.section}>
        <P size={16} color={colors.text2}>
          {t.rGoals1}
        </P>
        <Input
          value={`${month}`}
          onChange={(text: string) => setMonth(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          redux={false}
          limit={3}
        />
      </View>
      <View style={styles.section}>
        <P size={16} color={colors.text2}>
          {t.rGoals2}
        </P>
        <Input
          value={`${year}`}
          onChange={(text: string) => setYear(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          redux={false}
          limit={3}
        />
      </View>
      <Btn
        text={t.rGoals3}
        action={async () => {
          await saveGoals();
          console.log('aaa');
        }}
      />
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
