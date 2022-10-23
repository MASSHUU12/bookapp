import { View } from 'react-native';
import { useAppSelector } from '../../../../hooks';
import { t } from '../../../../i18n/strings';
import { commonStyles } from '../../../../styles/commonStyles';
import { DetailedBookType } from '../../../../types/detailedBookType';
import P from '../../../common/P';
import MoreOptionsList from '../components/MoreOptionsList';
import NoteModal from '../components/NoteModal';
import OptionsForNewBook from '../components/OptionsForNewBook';

interface Props {
  bookData: DetailedBookType;
  params: any;
}

const MarkAsSection = ({ bookData, params }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <>
      {'list' in bookData ? (
        <MoreOptionsList bookData={bookData} />
      ) : (
        <OptionsForNewBook book={params} />
      )}
      {'user_notes' in bookData && (
        <View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              ...commonStyles.wrapRow,
            }}>
            <P size={16}>{t.single3}</P>
            <NoteModal book={bookData} />
          </View>
          <P size={14} color={colors.placeholder}>
            {bookData.user_notes}
          </P>
        </View>
      )}
    </>
  );
};

export default MarkAsSection;
