// create database
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool();
pool.on('connect', () => {
  console.log('connected to the db');
});

class dropTable {
  /**
   * Drop User Table
   */
  static dropUserTable() {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
    pool
      .query(queryText)
      .then(res => {
        console.log(res);
        pool.end();
      })
      .catch(err => {
        console.log(err);
        pool.end();
      });
  }
}

dropTable.dropUserTable();
