import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

//will call controller
router.post('/api/users/create-user', UserControllers.createUser);
router.get('/api/users', UserControllers.getAllUsers);
router.get('/api/users/:userId', UserControllers.getSingleUser);
// //update-route
// router.put('/:userId', UserControllers.updateSingleUser);

export const UserRoutes = router;
