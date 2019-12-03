"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _pg = require("pg");

require("dotenv/config");

// create database
var pool = new _pg.Pool();
pool.on('connect', function () {
  console.log('connected to the db');
});

var dropTable =
/*#__PURE__*/
function () {
  function dropTable() {
    (0, _classCallCheck2.default)(this, dropTable);
  }

  (0, _createClass2.default)(dropTable, null, [{
    key: "dropUserTable",

    /**
     * Drop User Table
     */
    value: function dropUserTable() {
      var queryText = 'DROP TABLE IF EXISTS users returning *';
      pool.query(queryText).then(function (res) {
        console.log(res);
        pool.end();
      }).catch(function (err) {
        console.log(err);
        pool.end();
      });
    }
  }]);
  return dropTable;
}();

dropTable.dropUserTable();