import { Schema, model } from 'mongoose';
import { FullName, User, Address, Order } from './user/user.interface';

// Define interfaces for subdocuments

const FullNameSchema: Schema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const AddressSchema: Schema =
  new Schema<
  Address>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  });

const OrderSchema: Schema =
  new Schema<
  Order>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  });

const UserSchema: Schema = new Schema<User>({
  userId: { type: Number, required: true },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: FullNameSchema,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    hobbies: [
        {
            type: String,
            required: true
        }],
    address: {
        type: AddressSchema,
        required: true
    },
    orders: [
        {
            type: OrderSchema,
            required: true
        }],
});

const UserModel = model<User>('User', UserSchema);

export default UserModel;
