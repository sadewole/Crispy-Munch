import uuidv4 from 'uuid/v4';
import Helper from '../middleware/Helper';
import db from './index';

const hash = Helper.hashPassword('Admin1');
const admin = [uuidv4(), 'Admin', 'admin@crispymunch.com', hash, 'Admin'];
const text =
  'INSERT INTO users(id, username, email, password, role) VALUES($1, $2, $3, $4, $5) returning *';
db.query(text, admin)
  .then(res => console.log(res))
  .catch(err => console.log(err));
