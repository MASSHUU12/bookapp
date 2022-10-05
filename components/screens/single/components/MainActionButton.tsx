import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import P from '../../../common/P';
import { useAppSelector, useGlobalState } from '../../../../hooks';
import sql from '../../../../services/sql/sql';

/**
 *
 *
 * @return {*}  {JSX.Element}
 */

type Params = {
  list: ListType;
  bookKey: string;
};

type ListType = 'current' | 'readLater' | 'alreadyRead';

const MainActionButton = ({ list, bookKey }: Params): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const [state, dispatch] = useGlobalState();

  const buttons = {
    readLater: ['Move to currently reading', () => handleMainButton('current')],
    current: ['Move to already read', () => handleMainButton('alreadyRead')],
    alreadyRead: [
      'Mark with read again tag',
      () => handleMainButton('current'),
      ,
    ],
  };

  const handleMainButton = (list: ListType) => {
    sql.changeBookListByKey(bookKey, list);
    dispatch(1);
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={() => buttons[list][1]()}
        style={{
          backgroundColor: colors.textBtn,
          ...styles.mainButton,
        }}>
        <P color="white" size={20}>
          {buttons[list][0]}
        </P>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    transform: [{ translateY: -20 }],
  },
  mainButton: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default MainActionButton;
