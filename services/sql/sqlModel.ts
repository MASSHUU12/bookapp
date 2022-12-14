import {
  openDatabase,
  ResultSet,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';
import { Log } from 'helpers/Log';

export class SqlModel {
  db: SQLiteDatabase;
  dbName: string;

  constructor() {
    this.dbName = 'bookapp';
    this.db = openDatabase({ name: this.dbName });
  }

  execute(
    statement: string,
    args?: Array<any>,
    callback?: (tx: Transaction, res: ResultSet) => void,
  ) {
    Log.Clean(statement);

    this.db.transaction(tx => {
      tx.executeSql(
        statement,
        args || [],
        (tx, res) => {
          if (typeof callback === 'function') callback(tx, res);
        },
        err => this.handleError(err),
      );
    });
  }

  private handleError(err: any) {
    Log.Error(err);

    if (err.message.includes('no such table')) this.prepareTables();
  }

  private prepareTables() {
    this.execute(
      `CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        list TEXT,
        cover_i INTERGER,
        key TEXT NOT NULL UNIQUE,
        title TEXT,
        author_name TEXT,
        number_of_pages_median INTERGER,
        isbn TEXT,
        list_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );

    this.execute(
      `CREATE TABLE IF NOT EXISTS list_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT,
        lists_id INTEGER,
        user_tags TEXT DEFAULT "[]",
        user_notes TEXT NOT NULL DEFAULT " ",
        user_rating TEXT,
        if_read_again TEXT,
        FOREIGN KEY(lists_id) REFERENCES lists(id)
        ON DELETE CASCADE
      );`,
    );

    this.execute(
      `CREATE TABLE IF NOT EXISTS user_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`,
    );
  }
}
