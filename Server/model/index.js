import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool();
pool.on('connect', () => {
  console.log('connected to the db');
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
