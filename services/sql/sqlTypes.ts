export type saveBookTypes = {
  list: 'readLater' | 'current' | 'alreadyRead';
  bookId: string;
  title: string;
  author_name: string;
  number_of_pages_median: string;
  isbn: string;
  cover_i: number | string;
};

export type updateBookTypes = {
  book_key: string;
  field: string;
  value: string | number;
};

type tagType = {
  textColor: string;
  backgroundColor: string;
  name: string;
};

export type updateBookTagsTypes = {
  key: string;
  tags: Array<string>;
};

export type RemoveTagFromBookTypes = {
  key: string;
  tag: string;
};
