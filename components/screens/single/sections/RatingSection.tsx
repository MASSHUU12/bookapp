import { View } from 'react-native';
import { useAppSelector } from 'hooks';
import { t } from 'i18n/strings';
import sql from 'services/sql/sql';
import { commonStyles } from 'styles/commonStyles';
import { DetailedBookType } from 'types/detailedBookType';

import P from '@common/P';
import Rating from '@common/Rating';

interface Props {
  bookData: DetailedBookType;
}

const RatingSection = ({ bookData }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const onRatingChange = (rating: number) => {
    if (!('key' in bookData)) return;

    console.log(rating);

    sql.updateBookDetails({
      book_key: bookData.key,
      field: 'user_rating',
      value: rating,
    });
  };

  return (
    <>
      {'user_rating' in bookData && (
        <>
          <P color={colors.placeholder} size={14}>
            {t.single1}
          </P>
          <View style={{ marginTop: 0, ...commonStyles.wrapRow }}>
            <Rating
              rating={bookData.user_rating}
              onRatingChange={onRatingChange}
            />
          </View>
        </>
      )}
    </>
  );
};

export default RatingSection;
