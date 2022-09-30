import { saveBookTypes } from './sqlTypes';
import { SqlModel } from './sqlModel';

export default class SqlActions {
  db: SqlModel;

  constructor() {
    this.db = new SqlModel();
  }

  saveBookToList(params: saveBookTypes) {
    this.db.execute(
      `INSERT INTO lists(list, book_id, title, author_name, number_of_pages_median, isbn) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        params.list,
        params.bookId,
        params.title,
        params.author_name,
        params.number_of_pages_median,
        params.isbn,
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
