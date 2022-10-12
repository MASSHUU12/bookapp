import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from '../../../hooks';
import { t } from '../../../i18n/strings';
import sql from '../../../services/sql/sql';
import P from '../../common/P';
import ListItem from './components/ListItem';

const Lists = (): JSX.Element => {
  const colors = useAppSelector(state => state.theme.colors);

  // Test data
  const lists = [
    {
      name: 'Read later',
      image: '',
      list_name: 'readLater',
    },
    {
      name: 'Currently reading',
      image: '',
      list_name: 'current',
    },
    {
      name: 'Already read',
      image: '',
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
      style={{ backgroundColor: colors.background, ...styles.container }}
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
});

export default Lists;
