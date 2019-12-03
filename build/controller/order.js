"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _index = _interopRequireDefault(require("../model/index"));

var _Helper = _interopRequireDefault(require("../middleware/Helper"));

var OrderTable =
/*#__PURE__*/
function () {
  function OrderTable() {
    (0, _classCallCheck2.default)(this, OrderTable);
  }

  (0, _createClass2.default)(OrderTable, null, [{
    key: "getAllOrder",
    value: function () {
      var _getAllOrder = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(req, res) {
        var text, _ref, rows, data, i, order, food;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                text = "SELECT * from orders";
                _context.next = 4;
                return _index.default.query(text);

              case 4:
                _ref = _context.sent;
                rows = _ref.rows;

                if (rows[0]) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  message: 'Order history is empty'
                }));

              case 8:
                data = [];
                i = 0;

              case 10:
                if (!(i < rows.length)) {
                  _context.next = 19;
                  break;
                }

                order = rows[i];
                _context.next = 14;
                return _Helper.default.checkMenu(order.menu_id);

              case 14:
                food = _context.sent;
                data.push({
                  orderedDate: String(order.created_date).slice(4, 15).replace(/\s/g, '-'),
                  id: order.id,
                  userId: order.user_id,
                  food: food,
                  quantity: order.quantity,
                  amount: order.quantity * food.price,
                  status: order.status,
                  address: order.address,
                  phone: order.phone,
                  requestUserHistory: "http://localhost:3000/api/v1/user/".concat(order.user_id, "/order")
                });

              case 16:
                i++;
                _context.next = 10;
                break;

              case 19:
                return _context.abrupt("return", res.status(200).json({
                  TYPE: 'GET',
                  count: rows.length,
                  status: 200,
                  message: 'List of orders',
                  data: data
                }));

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  message: _context.t0
                }));

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 22]]);
      }));

      function getAllOrder(_x, _x2) {
        return _getAllOrder.apply(this, arguments);
      }

      return getAllOrder;
    }()
  }, {
    key: "addNewOrder",
    value: function addNewOrder(req, res) {
      var userId = req.user.rows[0].id;
      var params = [(0, _v.default)(), userId, req.body.menuId, req.body.quantity, 'pending', 'new'];
      var text = "INSERT INTO orders(id, user_id, menu_id, quantity, payment, status) VALUES($1, $2, $3, $4, $5, $6) returning *";

      _index.default.query(text, params).then(function (result) {
        res.status(200).json({
          TYPE: 'POST',
          status: 200,
          message: 'Order created successfully',
          data: result.rows[0]
        });
      }).catch(function (err) {
        res.status(400).json({
          message: err
        });
      });
    }
  }, {
    key: "getSingleOrder",
    value: function getSingleOrder(req, res) {
      var params = [req.params.id];
      var text = "SELECT * from orders WHERE id = $1";

      _index.default.query(text, params).then(function (result) {
        if (!result.rows.length) {
          return res.status(404).json({
            message: 'Not Found'
          });
        }

        return res.status(200).json({
          TYPE: 'GET',
          message: 'Request successful',
          data: result.rows.map(function (order) {
            return {
              id: order.id,
              userId: order.user_id,
              foodId: order.menu_id,
              quantity: order.quantity,
              request: "http://localhost:3000/api/v1/order/"
            };
          })
        });
      }).catch(function (err) {
        res.status(400).json({
          message: err
        });
      });
    }
  }, {
    key: "getUserOrders",
    value: function () {
      var _getUserOrders = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(req, res) {
        var text, _ref2, rows, data, i, food;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                text = "SELECT * from orders WHERE user_id=$1";
                _context2.prev = 1;
                _context2.next = 4;
                return _index.default.query(text, [req.params.id]);

              case 4:
                _ref2 = _context2.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  message: 'Cart is empty'
                }));

              case 8:
                data = [];
                i = 0;

              case 10:
                if (!(i < rows.length)) {
                  _context2.next = 18;
                  break;
                }

                _context2.next = 13;
                return _Helper.default.checkMenu(rows[i].menu_id);

              case 13:
                food = _context2.sent;
                data.push({
                  id: rows[i].id,
                  quantity: rows[i].quantity,
                  food: food,
                  payment: rows[i].payment
                });

              case 15:
                i++;
                _context2.next = 10;
                break;

              case 18:
                return _context2.abrupt("return", res.status(200).json({
                  TYPE: 'GET',
                  message: 'Request successful',
                  status: 200,
                  data: data
                }));

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", res.status(400).json({
                  err: _context2.t0
                }));

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 21]]);
      }));

      function getUserOrders(_x3, _x4) {
        return _getUserOrders.apply(this, arguments);
      }

      return getUserOrders;
    }()
  }, {
    key: "updateOrder",
    value: function updateOrder(req, res) {
      var params = [req.body.quantity, req.params.id];
      var text = "UPDATE orders SET quantity=$1 WHERE id=$2";

      _index.default.query(text, params).then(function (result) {
        res.status(200).json({
          TYPE: 'PUT',
          status: 200,
          message: 'Order updated successfully',
          data: result.rows[0]
        });
      }).catch(function (err) {
        res.status(400).json({
          message: err
        });
      });
    }
  }, {
    key: "patchUpdateOrder",
    value: function patchUpdateOrder(req, res) {
      var status = req.body.status;

      if (status === null || status === undefined) {
        status = 'new';
      }

      var params = [status, req.params.id];
      var text = "UPDATE orders SET status=$1 WHERE id=$2";

      _index.default.query(text, params).then(function (result) {
        res.status(200).json({
          TYPE: 'PATCH',
          status: 200,
          message: 'Order status updated successfully',
          data: result.rows[0]
        });
      }).catch(function (err) {
        res.status(400).json({
          message: err
        });
      });
    }
  }, {
    key: "updateUserOrders",
    value: function updateUserOrders(req, res) {
      var userId = req.user.rows[0].id;
      var _req$body = req.body,
          address = _req$body.address,
          email = _req$body.email,
          phone = _req$body.phone;
      var status = req.body.status;

      if (status === null || status === undefined) {
        status = 'new';
      }

      var params = [new Date(), address, email, phone, 'paid', status, userId];
      var text = "UPDATE orders SET created_date= $1,address=$2,email=$3,phone=$4, payment=$5, status=$6 WHERE user_id=$7";

      _index.default.query(text, params).then(function (result) {
        res.status(200).json({
          TYPE: 'PUT',
          status: 200,
          message: 'Food ordered successfully',
          data: result.rows[0]
        });
      }).catch(function (err) {
        res.status(400).json({
          message: err
        });
      });
    }
  }, {
    key: "deleteOrder",
    value: function deleteOrder(req, res) {
      var text = "DELETE from orders where id = $1";

      _index.default.query(text, [req.params.id]).then(function (result) {
        res.status(200).json({
          TYPE: 'DELETE',
          status: 200,
          message: 'Order Deleted successfully'
        });
      }).catch(function (err) {
        res.status(400).json({
          message: err
        });
      });
    }
  }, {
    key: "total",
    value: function () {
      var _total = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(req, res) {
        var text, _ref3, rows, _total2, i, order, food;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                text = "SELECT * from orders";
                _context3.next = 4;
                return _index.default.query(text);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;

                if (rows[0]) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  message: 'No sale has been made'
                }));

              case 8:
                _total2 = 0;
                i = 0;

              case 10:
                if (!(i < rows.length)) {
                  _context3.next = 19;
                  break;
                }

                order = rows[i];
                _context3.next = 14;
                return _Helper.default.checkMenu(order.menu_id);

              case 14:
                food = _context3.sent;
                _total2 += order.quantity * food.price;

              case 16:
                i++;
                _context3.next = 10;
                break;

              case 19:
                return _context3.abrupt("return", res.status(200).json({
                  TYPE: 'GET',
                  status: 200,
                  total: _total2,
                  message: 'Total sales update'
                }));

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  message: _context3.t0
                }));

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 22]]);
      }));

      function total(_x5, _x6) {
        return _total.apply(this, arguments);
      }

      return total;
    }()
  }]);
  return OrderTable;
}();

var _default = OrderTable;
exports.default = _default;