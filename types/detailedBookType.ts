import { BookType } from './bookType';

export type DetailedBookType = BookType & {
  user_tags: string;
  user_notes: string;
};
