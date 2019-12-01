"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

var _Helper = _interopRequireDefault(require("../middleware/Helper"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hash = _Helper.default.hashPassword('Admin1');

var admin = [(0, _v.default)(), 'Admin', 'admin@crispymunch.com', hash, 'Admin'];
var text = 'INSERT INTO users(id, username, email, password, role) VALUES($1, $2, $3, $4, $5) returning *';

_index.default.query(text, admin).then(function (res) {
  return console.log(res);
}).catch(function (err) {
  return console.log(err);
});