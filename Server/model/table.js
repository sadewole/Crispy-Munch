// create database
import db from './index';

class Tables {
  /* Create user Table */
  static createUserTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS
                  users(
                      id UUID PRIMARY KEY,
                      username text not null,
                      email text not null unique,
                      password text not null,
                      isAdmin boolean not null
                  )`;
    db.query(queryText)
      .then(res => {
        console.log(res);
        db.end();
      })
      .catch(err => {
        console.log(err);
        db.end();
      });
  }

  static createMenuTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS menu(
      id UUID PRIMARY KEY,
      name text not null,
      price numeric not null,
      image text not null      
    )`;

    db.query(queryText)
      .then(res => {
        console.log(res);
        db.end();
      })
      .catch(err => {
        console.log(err);
        db.end();
      });
  }

  static createOrderTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS order(
      id UUID PRIMARY KEY,

    )`;

    db.query(queryText)
      .then(res => {
        console.log(res);
        db.end();
      })
      .catch(err => {
        console.log(err);
        db.end();
      });
  }
}

// db.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });

Tables.createUserTable();
Tables.createMenuTable();
