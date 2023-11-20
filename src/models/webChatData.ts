import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for the chat details
interface IWebChat extends Document {
    id: string | null;
    title: string | null;
    username: string | null;
    type: string | null;
    bio: string | null;
    profilepic: string | null;
    members: number | null;
    ratings: number | null;
}

// Define a Mongoose schema for the chat details
const WebChatSchema = new Schema<IWebChat>({
    id: String,
    title: String,
    username: String,
    type: String,
    bio: String,
    profilepic: String,
    members: Number,
    ratings: Number
});

// Create and export the Mongoose model
export const WebData: Model<IWebChat> = mongoose.model('WebChat', WebChatSchema);
