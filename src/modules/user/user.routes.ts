import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

//will call controller
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
// //update-route
// router.put('/:userId', UserControllers.updateSingleUser);

export const UserRoutes = router;
