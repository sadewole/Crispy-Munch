import express from 'express';
import passport from 'passport';
import menuController from '../controller/menu';
import uploads from '../middleware/multer';

const router = express.Router();

router
  .route('/menu')
  .get(passport.authenticate('jwt', { session: false }), menuController.getAllMenu)
  .post(
    passport.authenticate('jwt', { session: false }),
    uploads.single('image'),
    menuController.addFood
  );

router
  .route('/menu/:id')
  .get(passport.authenticate('jwt', { session: false }), menuController.getSingleFood)
  .put(
    passport.authenticate('jwt', { session: false }),
    uploads.single('image'),
    menuController.updateFood
  )
  .delete(passport.authenticate('jwt', { session: false }), menuController.deleteFood);

export default router;
