import { saveBookTypes } from './sqlTypes';
import { SqlModel } from './sqlModel';

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
