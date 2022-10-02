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
    if (
      (err.message =
        "no such table: lists (code 1 SQLITE_ERROR): , while compiling: SELECT * FROM lists where list = 'current'")
    ) {
      this.prepareTables();
    }
  }

  private prepareTables() {
    this.execute(
      `CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        list TEXT, 
        book_id TEXT, 
        title TEXT, 
        author_name TEXT, 
        number_of_pages_median TEXT, 
        isbn TEXT
      );`,
    );

    this.execute(
      `CREATE TABLE IF NOT EXISTS list_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        lists_id INTEGER, 
        user_notes TEXT,
        user_rating TEXT,
        if_read_again TEXT,
        FOREIGN KEY(lists_id) REFERENCES lists(id)
      );`,
    );
  }
}
