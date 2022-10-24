import { View } from 'react-native';
import { useAppSelector } from 'hooks';
import { t } from 'i18n/strings';
import { commonStyles } from 'styles/commonStyles';
import { DetailedBookType } from 'types/detailedBookType';
import TagsModal from '../components/TagsModal';

import P from '@common/P';
import Tag from '@common/Tag';

interface Props {
  bookData: DetailedBookType;
  tags: any[];
}

const TagsSection = ({ bookData, tags }: Props): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 0,
          ...commonStyles.wrapRow,
        }}>
        <P color={colors.placeholder} size={14}>
          {t.single15}
        </P>
        <TagsModal book={bookData} />
      </View>
      <View style={{ ...commonStyles.wrapRow, marginTop: 0 }}>
        {tags.map((item: string, index: number) => (
          <Tag key={index} text={item} index={index} />
        ))}
      </View>
    </>
  );
};

export default TagsSection;
