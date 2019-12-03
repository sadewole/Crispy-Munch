"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../model/index"));

var Helper =
/*#__PURE__*/
function () {
  function Helper() {
    (0, _classCallCheck2.default)(this, Helper);
  }

  (0, _createClass2.default)(Helper, null, [{
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
      var _checkMenu = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(id) {
        var text, _ref, rows;

        return _regenerator.default.wrap(function _callee$(_context) {
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