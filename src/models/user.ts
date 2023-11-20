import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for the chat details
interface IUser extends Document {
  id: number | null;
  fname: string | null;
  lname: string | null;
  username: string | null;
  connection: string | null;
  CreatedAt:Date,
}

// Define a Mongoose schema for the chat details
const UserSchema = new Schema<IUser>({
  id: Number,
  fname: String,
  lname: String,
  username: String,
  connection: String,
  CreatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Mongoose model
export const UserModel: Model<IUser> = mongoose.model('User', UserSchema);
