import express from 'express';
import menuController from '../controller/menu';
import uploads from '../middleware/multer';

const router = express.Router();

router
  .route('/menu')
  .get(menuController.getAllMenu)
  .post(uploads.single('image'), menuController.addFood);

router
  .route('/menu/:id')
  .get(menuController.getSingleFood)
  .put(uploads.single('image'), menuController.updateFood)
  .delete(menuController.deleteFood);

export default router;
