export type saveBookTypes = {
  list: 'readLater' | 'current' | 'alreadyRead';
  bookId: string;
  title: string;
  author_name: string;
  number_of_pages_median: string;
  isbn: string;
  cover_i: number;
};
