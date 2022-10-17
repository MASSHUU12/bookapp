import { Alert, View } from 'react-native';
import React, { useEffect } from 'react';
import OptionsBtn from '../../../common/OptionsBtn';
import { BookType } from '../../../../types/bookType';
import { useGlobalState } from '../../../../hooks';
import sql from '../../../../services/sql/sql';
import { t } from '../../../../i18n/strings';

type PropsTypes = {
  bookData: BookType | {};
};

const MoreOptionsList = ({ bookData }: PropsTypes) => {
  const [state, dispatch] = useGlobalState();

  const handleRemoveBookFromHistory = () => {
    if (!('key' in bookData)) return;

    return Alert.alert(t.single11, t.single12, [
      {
        text: t.miscNo,
      },
      // The "Yes" button
      {
        text: t.miscYes,
        onPress: () => {
          sql.removeBookFromHistory(bookData.key);
          dispatch(1);
        },
      },
    ]);
  };

  const allOptionsAction = [
    () => null,
    () => null,
    () => console.log('Mark as favorite'),
    () => handleRemoveBookFromHistory(),
  ];

  const allOptionsText = [t.single9, t.single6, t.single7, t.single13];

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
        text={t.miscMore}
        modalTexts={allOptionsText}
        modalActions={allOptionsAction}
        name="singleMore"
      />
    </View>
  );
};

export default MoreOptionsList;
