import { Dimensions, FlatList } from 'react-native';
import { useAppSelector } from '../../../hooks';
import { t } from '../../../i18n/strings';
import { commonStyles } from '../../../styles/commonStyles';
import P from '../../common/P';
import ListItem from './components/ListItem';

import AlreadyRead from '../../../assets/images/lists/list_already_read.svg';
import ReadLater from '../../../assets/images/lists/list_read_later.svg';
import CurrentlyReading from '../../../assets/images/lists/list_currently_reading.svg';

const Lists = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  const w = Dimensions.get('window').width * 0.2;
  const h = Dimensions.get('window').height * 0.2;

  // Test data
  const lists = [
    {
      name: 'Read later',
      image: <ReadLater width={w} height={h} />,
      list_name: 'readLater',
    },
    {
      name: 'Currently reading',
      image: <CurrentlyReading width={w} height={h} />,
      list_name: 'current',
    },
    {
      name: 'Already read',
      image: <AlreadyRead width={w} height={h} />,
      list_name: 'alreadyRead',
    },
  ];

  return (
    <FlatList
      ListHeaderComponent={
        <P size={24} styles={{ marginBottom: 15 }}>
          {t.lists1}
        </P>
      }
      style={{
        backgroundColor: colors.background,
        ...commonStyles.basicScreen,
      }}
      data={lists}
      renderItem={({ item }) => (
        <ListItem
          name={item.name}
          image={item.image}
          list_name={item.list_name}
        />
      )}
    />
  );
};

export default Lists;
