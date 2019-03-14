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
    const queryText = `CREATE TABLE IF NOT EXISTS orders(
      id UUID PRIMARY KEY,
      user_id UUID not null,
      menu_id UUID not null,
      quantity numeric not null,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (menu_id) REFERENCES menu (id) ON DELETE CASCADE
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
Tables.createOrderTable();
