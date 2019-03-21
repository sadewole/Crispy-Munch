import uuidv4 from 'uuid/v4';
import db from '../model/index';
import Helper from '../middleware/Helper';

class OrderTable {
  static getAllOrder(req, res) {
    const text = `SELECT * from orders`;

    db.query(text)
      .then(result => {
        if (result.rows.length >= 1) {
          res.status(200).json({
            TYPE: 'GET',
            count: result.rows.length,
            message: 'List of ordered in food',
            data: result.rows.map(order => {
              return {
                id: order.id,
                userId: order.user_id,
                foodId: order.menu_id,
                quantity: order.quantity,
                request: `http://localhost:3000/api/v1/order/${order.id}`
              };
            })
          });
        } else {
          res.status(200).json({
            message: 'Cart is empty'
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          message: err
        });
      });
  }

  static addNewOrder(req, res) {
    const userId = req.user.rows[0].id;
    const params = [uuidv4(), userId, req.body.menuId, req.body.quantity];
    const text = `INSERT INTO orders(id, user_id, menu_id, quantity) VALUES($1, $2, $3, $4) returning *`;

    db.query(text, params)
      .then(result => {
        res.status(200).json({
          TYPE: 'POST',
          status: 200,
          message: 'Order created successfully',
          data: result.rows[0]
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err
        });
      });
  }

  static getSingleOrder(req, res) {
    const params = [req.params.id];
    const text = `SELECT * from orders WHERE id = $1`;

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
          data: result.rows.map(order => {
            return {
              id: order.id,
              userId: order.user_id,
              foodId: order.menu_id,
              quantity: order.quantity,
              request: `http://localhost:3000/api/v1/order/`
            };
          })
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err
        });
      });
  }

  static async getUserOrders(req, res) {
    const text = `SELECT * from orders WHERE user_id=$1`;
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          message: 'Cart is empty'
        });
      }

      const data = [];
      for (let i = 0; i < rows.length; i++) {
        const food = await Helper.checkMenu(rows[i].menu_id);
        data.push({
          id: rows[i].id,
          quantity: rows[i].quantity,
          food
        });
      }
      return res.status(200).json({
        TYPE: 'GET',
        message: 'Request successful',
        status: 200,
        data
      });
    } catch (err) {
      return res.status(400).json({
        err
      });
    }
  }

  static updateOrder(req, res) {
    const params = [req.body.quantity, req.params.id];

    const text = `UPDATE orders SET quantity=$1 WHERE id=$2`;

    db.query(text, params)
      .then(result => {
        res.status(200).json({
          TYPE: 'PUT',
          status: 200,
          message: 'Order updated successfully',
          data: result.rows[0]
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err
        });
      });
  }

  static updateUserOrders(req, res) {
    const { address, email, phoneNo } = req.body;

    const params = [address, email, phoneNo, req.params.id];
    const text = `UPDATE orders SET address=$1,email=$2,phoneNo=$3 WHERE id=$4`;

    db.query(text, params)
      .then(result => {
        res.status(200).json({
          TYPE: 'PUT',
          status: 200,
          message: 'Food ordered successfully',
          data: result.rows[0]
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err
        });
      });
  }

  static deleteOrder(req, res) {
    const text = `DELETE from orders where id = $1`;

    db.query(text, [req.params.id])
      .then(result => {
        res.status(200).json({
          TYPE: 'DELETE',
          status: 200,
          message: 'Order Deleted successfully'
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err
        });
      });
  }
}

export default OrderTable;
