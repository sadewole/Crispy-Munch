"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("./index"));

// create database
var Tables =
/*#__PURE__*/
function () {
  function Tables() {
    (0, _classCallCheck2.default)(this, Tables);
  }

  (0, _createClass2.default)(Tables, null, [{
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