"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _auth = _interopRequireDefault(require("../controller/auth"));

var _passport2 = _interopRequireDefault(require("../passport"));

var router = (0, _express.Router)();
router.route('/auth/signup').post(_auth.default.signup);
router.route('/auth/signin').post(_passport.default.authenticate('local', {
  session: false
}), _auth.default.signin);
router.route('/auth/secret').get(_passport.default.authenticate('jwt', {
  session: false
}), _auth.default.secret);
router.route('/auth/logout').get(_passport.default.authenticate('jwt', {
  session: false
}), _auth.default.logout);
var _default = router;
exports.default = _default;