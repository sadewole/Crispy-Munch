import express from 'express';
import orderController from '../controller/order';

const router = express.Router();

router
  .route('/order')
  .get(orderController.getAllOrder)
  .post(orderController.addNewOrder);

router
  .route('/order/:id')
  .get(orderController.getSingleOrder)
  .delete(orderController.deleteOrder);

export default router;
