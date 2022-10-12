import { View, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import P from '../../../common/P';
import { useAppSelector, useGlobalState } from '../../../../hooks';
import sql from '../../../../services/sql/sql';
import { BookType } from '../../../../types/bookType';
import { t } from '../../../../i18n/strings';

/**
 *
 *
 * @return {*}  {JSX.Element}
 */

type Params = {
  bookData: BookType | {};
  onNewBook: Function;
};

type ListType = 'current' | 'readLater' | 'alreadyRead';
type ListTypeExtended = 'current' | 'readLater' | 'alreadyRead' | 'none';

const MainActionButton = ({ bookData, onNewBook }: Params): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);
  const [state, dispatch] = useGlobalState();
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const currentList: ListTypeExtended = bookData.list || 'none';

  const buttons = {
    readLater: {
      title: t.single6,
      action: () => handleMainButton('current'),
    },
    current: {
      title: t.single7,
      action: () => handleMainButton('alreadyRead'),
    },
    alreadyRead: {
      title: t.single8,
      action: () => handleMainButton('current'),
    },
    none: {
      title: t.single9,
      action: () => handleMainButtonNewBook(),
    },
  };

  const handleMainButton = (list: ListType) => {
    sql.changeBookListByKey(bookData.key, list);
    setIsButtonPressed(true);
    dispatch(1);
  };

  const handleMainButtonNewBook = () => {
    setIsButtonPressed(true);
    onNewBook();
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        disabled={isButtonPressed}
        onPress={() => buttons[currentList].action()}
        style={{
          backgroundColor: isButtonPressed
            ? colors.placeholder
            : colors.textBtn,
          ...styles.mainButton,
        }}>
        <P color="white" size={20}>
          {isButtonPressed ? t.single10 : buttons[currentList].title}
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
