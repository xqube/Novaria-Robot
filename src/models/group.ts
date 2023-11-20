import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for the chat details
interface IGroup extends Document {
  id: string | null;
  title: string | null;
  username: string | null;
  gwelcome: string | null;
  type: string | null;
  iswelcome: boolean;
  welcome_msg_id: string;
  bio: string | null;
  profilepic: string | null;
  members: number | null;
  ratings: number | null;
  quizinterval: number,
  quizdelete: boolean,
  CreatedAt:Date,
}

// Define a Mongoose schema for the chat details
const GroupSchema = new Schema<IGroup>({
  id: String,
  title: String,
  username: String,
  gwelcome: String,
  type: String,
  iswelcome: {
    type: Boolean,
    default: true,
  },
  welcome_msg_id: String,
  bio: String,
  profilepic: String,
  members: Number,
  ratings: Number,
  quizinterval: {
    type: Number,
    default: 15,
  },
  quizdelete: {
    type: Boolean,
    default: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  }

});

// Create and export the Mongoose model
export const GroupModel: Model<IGroup> = mongoose.model('Group', GroupSchema);
