import express from 'express';
import passport from 'passport';
import userController from '../controller/user';

const router = express.Router();

router
  .route('/user')
  .get(passport.authenticate('jwt', { session: false }), userController.getAllUser);

router
  .route('/user/:id')
  .get(passport.authenticate('jwt', { session: false }), userController.getSingleUser)
  .delete(passport.authenticate('jwt', { session: false }), userController.deleteUser);

router
  .route('/user/:id/order')
  .get(passport.authenticate('jwt', { session: false }), userController.getUserOrders);
export default router;
