import { Request, Response } from 'express';
import User from '../user.model';
import userServices from './user.service';
import { TUserPartial } from './user.interface';
import userValidator from './user.validator';
import orderValidator from './order.validator';
import hash from '../../app/config/hash';


const createNewUser = async (req: Request, res: Response) => {
  try {
    // validating the User data 
    const validatedUser = userValidator.parse(req.body);

    const user = await userServices.createUser(validatedUser);

    //removing the unwanted fields
    const tempUser: TUserPartial = JSON.parse(JSON.stringify(user));
    delete tempUser.password;
    delete tempUser.orders;

    res.status(201).json({
      success: true,
      message: 'User created Successfully',
      data: tempUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create new user!', error });
  }
};

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched Successfully',
      data: users, 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (await User.findByUserId(userId)) {
      const users = await userServices.getSingleUserFromDB(userId);

      return res.status(200).json({
        success: true,
        message: 'User fetched Successfully',
        data: users,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};




const updateExistingUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedUser= req.body;

    // if password updated then hash it, before update
    if (updatedUser.password) {
      updatedUser.password = await hash(updatedUser.password);
    }

    if (await User.findByUserId(userId)) {
      await userServices.updateUser(userId, updatedUser);

      const user = await User.findOne({ userId }).select(
        '-password -orders -_id -__v -fullName._id -address._id',
      );

      return res.status(200).json({
        success: true,
        message: 'User updated Successfully',
        data: user,
        
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};
//delete Existing User
const deleteExistingUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);

    if (await User.findByUserId(id)) {
      await userServices.deleteUser(id);

      return res.status(200).json({
        success: true,
        message: 'User deleted Successfully',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};


//create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    // validating the Order Data, which is coming from request body
    const validatedOrder = orderValidator.parse(req.body);

    if (await User.findByUserId(userId)) {
      await userServices.createOrderOfUser(userId, validatedOrder);

      return res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {

    const userId = Number(req.params.userId);

    if (await User.findByUserId(userId)) {

      const orders = await userServices.getAllOrdersOfUser(userId);

      return res.status(200).json({

        success: true,
        message: 'Order fetched successfully!',
        data: orders,
      });
    } else {
      return res.status(404).json({  
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const totalPrice = async (req: Request, res: Response) => {
  try {

    const userId = Number(req.params.userId);
    if (await User.findByUserId(userId)) {
      const result = await userServices.calculatedTotalPrice(userId);

      return res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result.length > 0 ? result[0] : { totalPrice: 0 },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const userController = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  deleteExistingUser,
  updateExistingUser,
  createOrder,
  getOrders,
  totalPrice,
};

export default userController;
