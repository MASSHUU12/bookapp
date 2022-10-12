import { Alert, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import OptionsBtn from '../../../common/OptionsBtn';
import { BookType } from '../../../../types/bookType';
import { useGlobalState } from '../../../../hooks';
import sql from '../../../../services/sql/sql';

type PropsTypes = {
  bookData: BookType | {};
};

const MoreOptionsList = ({ bookData }: PropsTypes) => {
  const [state, dispatch] = useGlobalState();

  const handleRemoveBookFromHistory = () => {
    if (!('key' in bookData)) return;

    return Alert.alert(
      'Are your sure?',
      'Removing a book from history is irreversible',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            sql.removeBookFromHistory(bookData.key);
            dispatch(1);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const allOptionsAction = [
    () => null,
    () => null,
    () => console.log('Mark as favorite'),
    () => handleRemoveBookFromHistory(),
  ];

  const allOptionsText = [
    'Add to read later',
    'Add to currently reading',
    'Add to already read',
    'Remove book from history',
  ];

  const allOptionsMap = {
    readLater: 0,
    current: 1,
    alreadyRead: 2,
  };

  useEffect(() => {
    if (!('list' in bookData)) return;

    allOptionsText.splice(allOptionsMap[bookData.list], 1);
    allOptionsAction.splice(allOptionsMap[bookData.list], 1);
    console.log(allOptionsText);
  }, [bookData]);

  return (
    <View>
      <OptionsBtn
        text="Mark as..."
        modalTexts={allOptionsText}
        modalActions={allOptionsAction}
      />
    </View>
  );
};

export default MoreOptionsList;
