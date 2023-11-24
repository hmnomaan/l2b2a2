import { Router } from 'express';
import userController from './user.controller';

const UserRoutes = Router();

//user Create,Read, Update and Delete routes
UserRoutes.post('/', userController.createNewUser);
UserRoutes.get('/', userController.getAllUsers);
UserRoutes.get('/:userId', userController.getSingleUser);
UserRoutes.put('/:userId', userController.updateExistingUser);
UserRoutes.delete('/:userId', userController.deleteExistingUser);

//order routes
UserRoutes.put('/:userId/orders', userController.createOrder);
UserRoutes.get('/:userId/orders', userController.getOrders);
UserRoutes.get('/:userId/orders/total-price', userController.totalPrice);

export default UserRoutes;
