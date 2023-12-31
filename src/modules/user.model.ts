import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../app/config/index';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user/user.interface';


const fullNameSchema = new Schema<TFullName, UserModel>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
});

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  quantity: { type: Number, required: true, trim: true },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: { type: addressSchema, required: true },
  orders: { type: [orderSchema] },
});

 // finding a single user by  userId
userSchema.statics.findByUserId = function (userId: number) {
  return this.findOne({ userId });
};

 // hashing password, before save it to database
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  next();
});

const User = model<TUser, UserModel>('user', userSchema);

export default User;
