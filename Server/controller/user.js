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

  static getUserOrders(req, res) {
    const text = `SELECT * from orders WHERE user_id=$1`;

    db.query(text, [req.params.id])
      .then(result => {
        if (!result.rows.length) {
          return res.status(404).json({
            message: 'User orders not found'
          });
        }
        return res.status(200).json({
          TYPE: 'GET',
          message: 'Request successful',
          data: result.rows.map(ls => {
            return {
              id: ls.id,
              quantity: ls.quantity,
              food: ls.menu_id
            };
          })
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
          message: 'Food Deleted successfully'
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
