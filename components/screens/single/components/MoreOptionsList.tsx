import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import OptionsBtn from '../../../common/OptionsBtn';
import { BookType } from '../../../../types/bookType';
import { useGlobalState } from '../../../../hooks';

type PropsTypes = {
  bookData: BookType | {};
};

const MoreOptionsList = ({ bookData }: PropsTypes) => {
  const [state, dispatch] = useGlobalState();

  const allOptionsAction = [
    () => null,
    () => null,
    () => console.log('Mark as favorite'),
  ];

  const allOptionsText = [
    'Add to read later',
    'Add to currently reading',
    'Add to already read',
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

const styles = StyleSheet.create({});
