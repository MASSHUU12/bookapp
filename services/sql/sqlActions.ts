import {
  RemoveTagFromBookTypes,
  saveBookTypes,
  updateBookTagsTypes,
  updateBookTypes,
} from './sqlTypes';
import { SqlModel } from './sqlModel';
import { BookType } from '../../types/bookType';
import { DetailedBookType } from '../../types/detailedBookType';
import { generateCurrentTimestamp } from '../../helpers/helpers';

export default class SqlActions {
  db: SqlModel;

  constructor() {
    this.db = new SqlModel();
  }

  saveBookToList(params: saveBookTypes) {
    this.db.execute(
      `INSERT INTO lists(list, key, title, author_name, number_of_pages_median, isbn, cover_i) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        params.list,
        params.bookId,
        params.title,
        params.author_name,
        parseInt(params.number_of_pages_median),
        params.isbn,
        parseInt(params.cover_i),
      ],
      (tx, res) => {
        const list_id = res.insertId;
        this.db.execute(
          `INSERT INTO list_details(key, lists_id) VALUES (?, ?)`,
          [params.bookId, list_id],
          () => {
            console.log('success');
          },
        );
      },
    );
  }

  getBooksInList(
    list: 'readLater' | 'current' | 'alreadyRead',
    callback: (results: Array<BookType>) => void,
  ) {
    this.db.execute(
      `SELECT * FROM lists where list = '${list}'`,
      [],
      (tx, res) => {
        const len = res.rows.length;
        const results = [];
        for (let i = 0; i < len; i++) {
          results.push({ ...res.rows.item(i), id: i });
        }
        console.log(results);
        callback(results);
      },
    );
  }

  countBooksInList(
    list: 'readLater' | 'current' | 'alreadyRead',
    callback: (len: number) => void,
  ) {
    this.db.execute(
      `SELECT * FROM lists where list = '${list}'`,
      [],
      (tx, res) => {
        const len = res.rows.length;

        callback(len);
      },
    );
  }

  getSingleBookDetailedInfo(
    id: string,
    callback: (book: DetailedBookType) => void,
  ) {
    console.log('this is id', id);
    this.db.execute(
      `SELECT * FROM lists LEFT JOIN list_details ON lists.key = list_details.key WHERE lists.key = ?;`,
      [id],
      (tx, res) => {
        const len = res.rows.length;

        if (len === 0) console.log('this book is not in SQL');
        if (len === 0) return null;

        const resultWithAppendedId = { ...res.rows.item(0), id: 0 };

        console.log(resultWithAppendedId);
        callback(resultWithAppendedId);
      },
    );
  }

  changeBookListByKey(key: string, list: ListType) {
    const currentTimestamp = generateCurrentTimestamp();
    this.db.execute(
      `UPDATE lists SET list = ?, list_updated_at = ? WHERE key = ?`,
      [list, currentTimestamp, key],
      () => {
        console.log('Book list updated');
      },
    );
  }

  updateBookDetails(
    { book_key, field, value }: updateBookTypes,
    callback?: () => void,
  ) {
    this.db.execute(
      `UPDATE list_details SET ${field} = ? WHERE key = ?`,
      [value, book_key],
      () => {
        if (typeof callback === 'function') callback();
      },
    );
  }

  updateBookTags({ key, tags }: updateBookTagsTypes, callback?: () => void) {
    this.db.execute(
      `SELECT * FROM list_details WHERE list_details.key = ?;`,
      [key],
      (tx, res) => {
        const len = res.rows.length;

        const MAX_TAGS_FOR_BOOK = 10;

        if (len === 0) return console.warn('this book is not in SQL');

        let existingTags = res.rows.item(0).user_tags;

        const formatedExistingTags = JSON.parse(existingTags);

        if (formatedExistingTags.length >= MAX_TAGS_FOR_BOOK) {
          return console.warn(
            `You can't add more than ${MAX_TAGS_FOR_BOOK} tags for one book`,
          );
        }

        const allTags = [];

        if (existingTags != null)
          allTags.push(...formatedExistingTags, ...tags);

        const stringifiedTags = JSON.stringify(allTags);

        this.db.execute(
          `UPDATE list_details SET user_tags = ? WHERE key = ?`,
          [stringifiedTags, key],
          () => {
            if (typeof callback === 'function') callback();
          },
        );
      },
    );
  }

  removeTagFromBook(
    { key, tag }: RemoveTagFromBookTypes,
    callback?: () => void,
  ) {
    this.db.execute(
      `SELECT * FROM list_details WHERE list_details.key = ?;`,
      [key],
      (tx, res) => {
        const len = res.rows.length;

        if (len === 0) return console.warn('this book is not in SQL');

        let existingTags = res.rows.item(0).user_tags;

        const formatedExistingTags = JSON.parse(existingTags);

        const indexOfTag = formatedExistingTags.indexOf(tag);

        if (indexOfTag < 0) return console.warn('tag does not exist');

        formatedExistingTags.splice(indexOfTag, 1);

        const stringifiedTags = JSON.stringify(formatedExistingTags);

        this.db.execute(
          `UPDATE list_details SET user_tags = ? WHERE key = ?`,
          [stringifiedTags, key],
          () => {
            if (typeof callback === 'function') callback();
          },
        );
      },
    );
  }

  removeBookFromHistory(key: string) {
    this.db.execute(`DELETE FROM lists WHERE key = ?`, [key], () => {
      console.log('success');
    });
  }

  selectAllFromDetails() {
    this.db.execute('select * from list_details', [], (tx, res) => {
      const len = res.rows.length;
      const results = [];
      for (let i = 0; i < len; i++) {
        results.push({ ...res.rows.item(i), id: i });
      }
      console.log(results);
    });
  }

  getAllTags(callback: (results: Array<any>) => void) {
    this.db.execute(`SELECT * FROM user_tags `, [], (tx, res) => {
      const len = res.rows.length;
      const results = [];
      for (let i = 0; i < len; i++) {
        results.push({ ...res.rows.item(i), id: i });
      }
      callback(results);
    });
  }

  addTag(tag: string, callback?: () => void) {
    const MAX_TAG_LENGTH = 15;
    if (tag.length > MAX_TAG_LENGTH)
      return console.warn('Tag name is too long');

    this.db.execute(`INSERT INTO user_tags(name) VALUES (?)`, [tag], () => {
      if (typeof callback === 'function') callback();
    });
  }

  removeTag(tag: string, callback?: () => void) {
    // find all books which contain the tag we are about to remove
    this.db.execute(
      `SELECT * FROM list_details WHERE user_tags LIKE ?`,
      [`%"${tag}"%`],
      (tx, res) => {
        console.log(tag);
        const len = res.rows.length;
        const results = [];
        for (let i = 0; i < len; i++) {
          results.push({ ...res.rows.item(i), id: i });
        }

        // remove tag from every single book which contains it
        results.forEach(result => {
          this.removeTagFromBook({ key: result.key, tag: tag });
        });

        // remove tag from user_tags table
        this.db.execute('DELETE FROM user_tags WHERE name = ?', [tag], () => {
          if (typeof callback === 'function') callback();
        });
      },
    );
  }

  getStatsForMonth({ month, year }, callback: (results: number) => void) {
    this.db.execute(
      `SELECT * FROM lists WHERE list_updated_at BETWEEN '2021-03-26 00:00:01' AND '2023-03-26 23:59:59'`,
      [],
      (tx, res) => {
        const len = res.rows.length;

        callback(len);
      },
    );
  }

  clearListTable() {
    this.db.execute('DELETE FROM lists', [], () => {
      this.db.execute('DELETE FROM list_details', [], () => {
        console.log('success');
      });
    });
  }

  dropAlltables() {
    this.db.execute('DROP TABLE lists', [], () => {
      this.db.execute('DROP TABLE list_details', [], () => {
        this.db.execute('DROP TABLE user_tags', [], () => {
          console.log('Tables dropped');
        });
      });
    });
  }
}
