import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

export class SqlModel {
  db: SQLiteDatabase;
  dbName: string;

  constructor() {
    this.dbName = 'bookapp';
    this.db = openDatabase({ name: this.dbName });
  }

  execute(statement: string, args?: Array<string>, callback?: Function) {
    console.log(statement);
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
    console.log(err);
    if (err.code === 5) {
      this.prepareTables();
    }
  }

  private prepareTables() {
    this.execute(
      'CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, list TEXT, book_id TEXT, title TEXT, author_name TEXT, number_of_pages_median TEXT, isbn TEXT)',
    );
  }
}
