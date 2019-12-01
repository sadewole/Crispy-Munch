"use strict";

var _pg = require("pg");

require("dotenv/config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pool = new _pg.Pool();
pool.on('connect', function () {
  console.log('connected to the db');
});

var dropTable =
/*#__PURE__*/
function () {
  function dropTable() {
    _classCallCheck(this, dropTable);
  }

  _createClass(dropTable, null, [{
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