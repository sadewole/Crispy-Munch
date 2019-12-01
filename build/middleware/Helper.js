"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../model/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Helper =
/*#__PURE__*/
function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: "hashPassword",
    //   Hash password
    value: function hashPassword(password) {
      return _bcryptjs.default.hashSync(password, _bcryptjs.default.genSaltSync(10));
    } // Check exist email

  }, {
    key: "exitEmail",
    value: function exitEmail(email) {
      var text = "SELECT * from users WHERE email = $1";

      var confirmCheck = _index.default.query(text, [email]);

      return confirmCheck;
    } // Compare password

  }, {
    key: "comparePassword",
    value: function comparePassword(hashPassword, password) {
      return _bcryptjs.default.compareSync(password, hashPassword);
    }
    /**
     * Query menu
     */

  }, {
    key: "checkMenu",
    value: function () {
      var _checkMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        var text, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = "SELECT * from menu WHERE id = $1";
                _context.next = 3;
                return _index.default.query(text, [id]);

              case 3:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows[0]);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkMenu(_x) {
        return _checkMenu.apply(this, arguments);
      }

      return checkMenu;
    }()
    /**
     * Gnerate Token
     */

  }, {
    key: "generateToken",
    value: function generateToken(user) {
      var token = _jsonwebtoken.default.sign({
        iss: 'codeSecret',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      }, process.env.JWT_SECRET);

      return token;
    }
  }]);

  return Helper;
}();

var _default = Helper;
exports.default = _default;