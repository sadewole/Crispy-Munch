"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _auth = _interopRequireDefault(require("./route/auth"));

var _order = _interopRequireDefault(require("./route/order"));

var _menu = _interopRequireDefault(require("./route/menu"));

var _user = _interopRequireDefault(require("./route/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // middleware

app.use(_express.default.static('Front-end'));
app.use((0, _cors.default)());
app.use((0, _morgan.default)());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
})); // Routers

app.use('/api/v1', _auth.default);
app.use('/api/v1', _order.default);
app.use('/api/v1', _menu.default);
app.use('/api/v1', _user.default); // Error handler

app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use(function (err, req, res, next) {
  var error = app.get('env') === 'development' ? err : {};
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});
/* PORT */

var port = process.env.PORT;
app.listen(port, function () {
  console.log("You're listening to port: ".concat(port));
});