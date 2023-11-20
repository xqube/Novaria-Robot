import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for the chat details
interface IQuiz extends Document {
  quizid: string,
  userid: string;
  fname: string;
  question: string;
  options: Array<string>;
  correctoption: number;
  difficulty: string;
  catagories: string;
  explanation: string
}

// Define a Mongoose schema for the chat details
const QuizSchema = new Schema<IQuiz>({
  quizid: String,
  userid: String,
  fname: String,
  question: String,
  options: Array<string>,
  correctoption: Number,
  difficulty: String,
  catagories: String,
  explanation: String

});

// Create and export the Mongoose model
export const QuizModel: Model<IQuiz> = mongoose.model('Quiz', QuizSchema);
