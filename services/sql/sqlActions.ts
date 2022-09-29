import { saveBookTypes } from './sqlTypes';
import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { handleError } from './sqlUtils';
import { SqlModel } from './sqlModel';

export default class SqlActions {
  db: SqlModel;

  constructor() {
    this.db = new SqlModel();
  }

  saveBookToList(params: saveBookTypes) {
    this.db.execute(
      `INSERT INTO lists(list, book_id) VALUES ('${params.list}', '${params.bookId}')`,
      [],
      () => {
        console.log('success');
      },
    );
  }

  getBooksInList(list: 'readLater' | 'current' | 'alreadyRead') {
    this.db.execute(
      `SELECT * FROM lists where list = '${list}'`,
      [],
      (tx, res) => {
        const len = res.rows.length;
        const results = [];
        for (let i = 0; i < len; i++) {
          results.push(res.rows.item(i));
        }
        return results;
      },
    );
  }
}
