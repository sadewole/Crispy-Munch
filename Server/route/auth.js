import { Router } from 'express';
import passport from 'passport';
import authController from '../controller/auth';
import passportConfig from '../passport';

const router = Router();

router.route('/auth/signup').post(authController.signup);
router
  .route('/auth/signin')
  .post(passport.authenticate('local', { session: false }), authController.signin);
router
  .route('/auth/secret')
  .get(passport.authenticate('jwt', { session: false }), authController.secret);

export default router;
