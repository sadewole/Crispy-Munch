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
	.put(passport.authenticate('jwt', { session: false }), orderController.updateOrder)
	.delete(passport.authenticate('jwt', { session: false }), orderController.deleteOrder);

router
	.route('/user/:id/order')
	.get(passport.authenticate('jwt', { session: false }), orderController.getUserOrders)
	.put(passport.authenticate('jwt', { session: false }), orderController.updateUserOrders);

router.route('/total').get(passport.authenticate('jwt', { session: false }), orderController.total);
export default router;
