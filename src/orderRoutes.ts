import express from 'express';
import {OrderController} from './orderController';
const router = express.Router();
const orderController = new OrderController();

router.post('/create-order', orderController.createOrder);

export default router;
