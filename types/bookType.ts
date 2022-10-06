export type BookType = {
  key: string;
  title: string;
  author_name: string;
  number_of_pages_median: string;
  isbn: string | Array<string>;
  cover_i: number;
  list: 'current' | 'readLater' | 'alreadyRead';
};
