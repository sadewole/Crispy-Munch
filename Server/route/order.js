import express from 'express';
import passport from 'passport';
import orderController from '../controller/order';

const router = express.Router();

router
  .route('/order')
  .get(orderController.getAllOrder)
  .post(passport.authenticate('jwt', { session: false }), orderController.addNewOrder);

router
  .route('/order/:id')
  .get(orderController.getSingleOrder)
  .patch(passport.authenticate('jwt', { session: false }), orderController.updateOrder)
  .delete(passport.authenticate('jwt', { session: false }), orderController.deleteOrder);

router
  .route('/user/:id/order')
  .get(passport.authenticate('jwt', { session: false }), orderController.getUserOrders);
// .post(passport.authenticate('jwt', { session: false }), userController.postUserOrders);
export default router;
