import { FlatList } from 'react-native';
import { useAppSelector } from 'hooks';
import { t } from 'i18n/strings';
import { commonStyles } from 'styles/commonStyles';
import P from '@common/P';
import ListItem from './components/ListItem';

const Lists = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  // Test data
  const lists = [
    {
      name: 'Read later',
      image: 0,
      list_name: 'readLater',
    },
    {
      name: 'Currently reading',
      image: 1,
      list_name: 'current',
    },
    {
      name: 'Already read',
      image: 2,
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
