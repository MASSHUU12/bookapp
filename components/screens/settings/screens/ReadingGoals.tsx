import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { toggleModal } from '../../../../features/modal/modalSlice';
import {
  targetPerMonth,
  targetPerYear,
} from '../../../../features/targets/targetSlice';
import { setItem } from '../../../../helpers/Storage';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import { ModalType } from '../../../../types/modalsType';
import Btn from '../../../common/Btn';
import CModal from '../../../common/CModal';
import Input from '../../../common/Input';
import P from '../../../common/P';

const ReadingGoals = (): JSX.Element => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const colors = useAppSelector(state => state.theme.colors);
  const dispatch = useAppDispatch();

  const saveGoals = async () => {
    // Set in storage.
    await setItem('target_month', month);
    await setItem('target_year', year);

    // Set in redux.
    dispatch(targetPerMonth(month));
    dispatch(targetPerYear(year));
  };

  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }}>
      <P>{t.rGoals4}</P>
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
      <View style={{ ...styles.section, marginBottom: '70%' }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 25,
    paddingHorizontal: 10,
    paddingBottom: 45,
    width: '100%',
    height: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    paddingHorizontal: 25,
  },
  section: {
    marginVertical: 15,
    width: '100%',
  },
});

export default ReadingGoals;
