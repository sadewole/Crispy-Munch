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
  .put(passport.authenticate('jwt', { session: false }), userController.upgradeUser)
  .delete(passport.authenticate('jwt', { session: false }), userController.deleteUser);

export default router;
