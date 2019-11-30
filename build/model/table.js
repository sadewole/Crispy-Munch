"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tables =
/*#__PURE__*/
function () {
  function Tables() {
    _classCallCheck(this, Tables);
  }

  _createClass(Tables, null, [{
    key: "createUserTable",

    /* Create user Table */
    value: function createUserTable() {
      var queryText = "CREATE TABLE IF NOT EXISTS\n                  users(\n                      id UUID PRIMARY KEY,\n                      username text not null,\n                      email text not null unique,\n                      password text not null,\n                      role text not null\n                  )";

      _index.default.query(queryText).then(function (res) {
        console.log(res);

        _index.default.end();
      }).catch(function (err) {
        console.log(err);

        _index.default.end();
      });
    }
  }, {
    key: "createMenuTable",
    value: function createMenuTable() {
      var queryText = "CREATE TABLE IF NOT EXISTS menu(\n      id UUID PRIMARY KEY,\n      name text not null,\n      price numeric not null,\n      image text not null      \n    )";

      _index.default.query(queryText).then(function (res) {
        console.log(res);

        _index.default.end();
      }).catch(function (err) {
        console.log(err);

        _index.default.end();
      });
    }
  }, {
    key: "createOrderTable",
    value: function createOrderTable() {
      var queryText = "CREATE TABLE IF NOT EXISTS orders(\n      id UUID PRIMARY KEY,\n      user_id UUID not null,\n      menu_id UUID not null,\n      quantity numeric not null,\n      email text,\n      address text,\n      phone numeric,\n      status text,\n      payment text,\n      created_date TIMESTAMP,\n      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n      FOREIGN KEY (menu_id) REFERENCES menu (id) ON DELETE CASCADE\n    )";

      _index.default.query(queryText).then(function (res) {
        console.log(res);

        _index.default.end();
      }).catch(function (err) {
        console.log(err);

        _index.default.end();
      });
    }
  }]);

  return Tables;
}(); // db.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });


Tables.createUserTable();
Tables.createMenuTable();
Tables.createOrderTable();