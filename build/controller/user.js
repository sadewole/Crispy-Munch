"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _index = _interopRequireDefault(require("../model/index"));

var _Helper = _interopRequireDefault(require("../middleware/Helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserTable =
/*#__PURE__*/
function () {
  function UserTable() {
    _classCallCheck(this, UserTable);
  }

  _createClass(UserTable, null, [{
    key: "getAllUser",
    value: function getAllUser(req, res) {
      var text = "SELECT * from users";

      _index.default.query(text).then(function (result) {
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
      }).catch(function (err) {
        res.status(500).json(err);
      });
    }
  }, {
    key: "getSingleUser",
    value: function getSingleUser(req, res) {
      var text = "SELECT * from users WHERE id = $1";
      var params = [req.params.id];

      _index.default.query(text, params).then(function (result) {
        if (!result.rows.length) {
          return res.status(404).json({
            message: 'Not Found'
          });
        }

        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          message: 'Request successful',
          data: result.rows[0]
        });
      }).catch(function (err) {
        res.status(400).json(err);
      });
    }
  }, {
    key: "upgradeUser",
    value: function upgradeUser(req, res) {
      var text = "UPDATE users set role=$1 where id=$2";

      _index.default.query(text, ['Admin', req.params.id]).then(function (result) {
        res.status(200).json({
          TYPE: 'PUT',
          status: 200,
          message: 'User now has the role of an admin'
        });
      }).catch(function (err) {
        res.status(400).json(err);
      });
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(req, res) {
      var text = "DELETE from users where id = $1";

      _index.default.query(text, [req.params.id]).then(function (result) {
        res.status(200).json({
          TYPE: 'DELETE',
          status: 200,
          message: 'Account Deleted successfully'
        });
      }).catch(function (err) {
        res.status(400).json({
          message: err
        });
      });
    }
  }]);

  return UserTable;
}();

var _default = UserTable;
exports.default = _default;