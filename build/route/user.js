"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("../controller/user"));

var router = _express.default.Router();

router.route('/user').get(_passport.default.authenticate('jwt', {
  session: false
}), _user.default.getAllUser);
router.route('/user/:id').get(_passport.default.authenticate('jwt', {
  session: false
}), _user.default.getSingleUser).put(_passport.default.authenticate('jwt', {
  session: false
}), _user.default.upgradeUser).delete(_passport.default.authenticate('jwt', {
  session: false
}), _user.default.deleteUser);
var _default = router;
exports.default = _default;