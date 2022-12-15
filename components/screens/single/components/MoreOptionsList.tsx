import { useEffect } from 'react';
import { Alert, View } from 'react-native';
import OptionsBtn from '@common/OptionsBtn';
import { BookType } from 'types/bookType';
import { useGlobalState } from 'hooks';
import sql from 'services/sql/sql';
import { t } from 'i18n/strings';
import { Log } from 'helpers/Log';

type PropsTypes = {
  bookData: BookType | {};
};

/**
 *
 *
 * @param {PropsTypes} { bookData }
 * @return {*}
 */
const MoreOptionsList: React.FunctionComponent<PropsTypes> = ({
  bookData,
}: PropsTypes): any => {
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
    () => Log.Clean('Mark as favorite.'),
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

    Log.Info(allOptionsText);
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
