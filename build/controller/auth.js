"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _index = _interopRequireDefault(require("../model/index"));

var _Helper = _interopRequireDefault(require("../middleware/Helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "signup",

    /* Create user */
    value: function signup(req, res) {
      var hash = _Helper.default.hashPassword(req.body.password);

      var newUser = [(0, _v.default)(), req.body.username, req.body.email, hash, 'User'];
      var text = 'INSERT INTO users(id, username, email, password, role) VALUES($1, $2, $3, $4, $5) returning *';

      _index.default.query(text, newUser).then(function (result) {
        var token = _Helper.default.generateToken(result.rows[0]);

        res.status(200).json({
          TYPE: 'POST',
          status: 200,
          data: result.rows[0],
          token: token,
          message: 'Registered successfully'
        });
      }).catch(function (err) {
        if (err.routine === '_bt_check_unique') {
          return res.status(400).send({
            message: 'User with that EMAIL already exist'
          });
        }

        return res.status(400).json(err);
      });
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      if (req.user) {
        var token = _Helper.default.generateToken(req.user);

        res.status(200).json({
          TYPE: 'POST',
          status: 200,
          message: 'Login successful',
          data: req.user,
          token: token
        });
      }
    }
  }, {
    key: "secret",
    value: function secret(req, res) {
      res.status(200).json({
        TYPE: 'GET',
        data: req.user.rows[0],
        status: 200,
        secret: 'resource'
      });
    }
  }, {
    key: "logout",
    value: function logout(req, res) {
      res.status(200).json({
        TYPE: 'GET',
        status: 200,
        token: 'null',
        message: 'Logout successfully'
      });
    }
  }]);

  return AuthController;
}();

var _default = AuthController;
exports.default = _default;