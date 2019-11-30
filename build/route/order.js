"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _order = _interopRequireDefault(require("../controller/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.route('/order').get(_order.default.getAllOrder).post(_passport.default.authenticate('jwt', {
  session: false
}), _order.default.addNewOrder);
router.route('/order/:id').get(_order.default.getSingleOrder).put(_passport.default.authenticate('jwt', {
  session: false
}), _order.default.updateOrder).patch(_passport.default.authenticate('jwt', {
  session: false
}), _order.default.patchUpdateOrder).delete(_passport.default.authenticate('jwt', {
  session: false
}), _order.default.deleteOrder);
router.route('/user/:id/order').get(_passport.default.authenticate('jwt', {
  session: false
}), _order.default.getUserOrders).put(_passport.default.authenticate('jwt', {
  session: false
}), _order.default.updateUserOrders);
router.route('/total').get(_passport.default.authenticate('jwt', {
  session: false
}), _order.default.total);
var _default = router;
exports.default = _default;