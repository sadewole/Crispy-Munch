import uuidv4 from 'uuid/v4';
import db from '../model/index';
import Helper from '../middleware/Helper';

class UserTable {
  static getAllUser(req, res) {
    const text = `SELECT * from users`;

    db.query(text)
      .then(result => {
        if (result.rows.length >= 1) {
          res.status(200).json({
            TYPE: 'GET',
            status: 200,
            count: result.rows.length,
            message: 'List of all customers',
            data: result.rows
          });
        } else {
          res.status(200).json({
            message: 'No registered customer'
          });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static getSingleUser(req, res) {
    const text = `SELECT * from users WHERE id = $1`;
    const params = [req.params.id];

    db.query(text, params)
      .then(result => {
        if (!result.rows.length) {
          return res.status(404).json({
            message: 'Not Found'
          });
        }
        return res.status(200).json({
          TYPE: 'GET',
          message: 'Request successful',
          data: result.rows[0]
        });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }

  static upgradeUser(req, res) {
    const text = `UPDATE users set role=$1 where id=$2`;

    db.query(text, ['Admin', req.params.id])
      .then(result => {
        res.status(200).json({
          TYPE: 'PUT',
          status: 200,
          message: 'User now has the role of an admin'
        });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }

  static deleteUser(req, res) {
    const text = `DELETE from users where id = $1`;

    db.query(text, [req.params.id])
      .then(result => {
        res.status(200).json({
          TYPE: 'DELETE',
          status: 200,
          message: 'Account Deleted successfully'
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err
        });
      });
  }
}

export default UserTable;
