import express from 'express';
import {
  getUsers,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/users').get(protect, admin, getUsers);
router.route('/orders').get(protect, admin, getOrders);
router.route('/orders/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
