import { View } from 'react-native';
import React from 'react';
import sql from 'services/sql/sql';
import { useGlobalState } from 'hooks';
import { t } from 'i18n/strings';
import SlimBtn from '@common/SlimBtn';

import { ListType } from 'types/listType';
import { BookType } from 'types/bookType';

interface Props {
  book: BookType;
}

interface ActionsType {
  name: string;
  action: () => void;
}

/**
 *
 *
 * @param {Props} { book }
 * @return {*}
 */
const OptionsForNewBook: React.FunctionComponent<Props> = ({
  book,
}: Props): any => {
  const [onRefresh, refresh] = useGlobalState();

  const actions: Array<ActionsType> = [
    {
      name: t.single6,
      action: () => {
        saveBookToList('current');
      },
    },
    {
      name: t.single7,
      action: () => {
        saveBookToList('alreadyRead');
      },
    },
  ];

  const saveBookToList = (list: ListType) => {
    sql.saveBookToList({
      list: list,
      bookId: book.key,
      title: book.title,
      author_name: book.author_name,
      number_of_pages_median: book.number_of_pages_median,
      isbn: book.isbn[0],
      cover_i: book.cover_i,
    });
    refresh(1);
  };

  return (
    <View>
      {actions.map((action, index) => (
        <SlimBtn key={index} text={action.name} action={action.action} />
      ))}
    </View>
  );
};

export default OptionsForNewBook;
