import { saveBookTypes, updateBookTypes } from './sqlTypes';
import { SqlModel } from './sqlModel';
import { ListType } from '../../types/type';
import { BookType } from '../../types/bookType';

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

  getSingleBookDetailedInfo(id: string, callback: (book: BookType) => void) {
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
    this.db.execute(
      `UPDATE lists SET list = ? WHERE key = ?`,
      [list, key],
      () => {
        console.log('success');
      },
    );
  }

  updateBookDetails(params: updateBookTypes) {
    this.db.execute(
      `UPDATE list_details SET ${params.field} = ? WHERE key = ?`,
      [params.value, params.book_key],
      () => {
        console.log('success');
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
        console.log('success');
      });
    });
  }
}
