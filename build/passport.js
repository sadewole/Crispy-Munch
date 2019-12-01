"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

require("dotenv/config");

var _index = _interopRequireDefault(require("./model/index"));

var _Helper = _interopRequireDefault(require("./middleware/Helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JWTStrategy = require('passport-jwt').Strategy;

var LocalStrategy = require('passport-local').Strategy; // JWT Strategy


_passport.default.use('jwt', new JWTStrategy({
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(payload, done) {
    var text, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            text = "select * from users where id = $1";
            _context.next = 4;
            return _index.default.query(text, [payload.sub]);

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 7:
            return _context.abrupt("return", done(null, user));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", done(_context.t0, false));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}())); // LOCAL strategy


_passport.default.use('local', new LocalStrategy({
  usernameField: 'email'
},
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(email, password, done) {
    var _ref3, rows, user, compare;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Helper.default.exitEmail(email);

          case 3:
            _ref3 = _context2.sent;
            rows = _ref3.rows;
            user = rows[0];

            if (user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", done(null, false));

          case 8:
            _context2.next = 10;
            return _Helper.default.comparePassword(user.password, password);

          case 10:
            compare = _context2.sent;

            if (compare) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", done(null, false));

          case 13:
            return _context2.abrupt("return", done(null, user));

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", done(_context2.t0, null));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()));