"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _menu = _interopRequireDefault(require("../controller/menu"));

var _multer = _interopRequireDefault(require("../middleware/multer"));

var router = _express.default.Router();

router.route('/menu').get(_passport.default.authenticate('jwt', {
  session: false
}), _menu.default.getAllMenu).post(_passport.default.authenticate('jwt', {
  session: false
}), _multer.default.single('image'), _menu.default.addFood);
router.route('/menu/:id').get(_passport.default.authenticate('jwt', {
  session: false
}), _menu.default.getSingleFood).put(_passport.default.authenticate('jwt', {
  session: false
}), _multer.default.single('image'), _menu.default.updateFood).delete(_passport.default.authenticate('jwt', {
  session: false
}), _menu.default.deleteFood);
var _default = router;
exports.default = _default;