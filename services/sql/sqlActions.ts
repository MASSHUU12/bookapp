import { saveBookTypes } from './sqlTypes';
import { SqlModel } from './sqlModel';

export default class SqlActions {
  db: SqlModel;

  constructor() {
    this.db = new SqlModel();
  }

  saveBookToList(params: saveBookTypes) {
    this.db.execute(
      `INSERT INTO lists(list, book_id, title, author_name, number_of_pages_median, isbn, cover_i) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        params.list,
        params.bookId,
        params.title,
        params.author_name,
        parseInt(params.number_of_pages_median),
        params.isbn,
        parseInt(params.cover_i),
      ],
      () => {
        console.log('success');
      },
    );
  }

  getBooksInList(
    list: 'readLater' | 'current' | 'alreadyRead',
    callback: Function,
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

  getSingleBookDetailedInfo(id: string, callback: Function) {
    this.db.execute(
      `SELECT * FROM lists where book_id = ?`,
      [id],
      (tx, res) => {
        const len = res.rows.length;

        if (len === 0) return null;

        const resultWithAppendedId = { ...res.rows.item(0), id: 0 };

        console.log(resultWithAppendedId);
        callback(resultWithAppendedId);
      },
    );
  }

  clearListTable() {
    this.db.execute('DELETE FROM lists', [], () => {
      console.log('success');
    });
  }

  dropAlltables() {
    this.db.execute('DROP TABLE lists', [], () => {
      console.log('success');
    });
  }
}
