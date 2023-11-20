import mongoose from 'mongoose';
import {config} from '../config'
import { botStart } from './app';


function onsuccessfullstart(){
    console.log('====================================');
    console.log('Bot started Successfully');
    console.log('====================================');
}

botStart(onsuccessfullstart);

const mongoconnection = () =>{
  const mongodbURI = config.MONGO_URL;
  mongoose
    .connect(mongodbURI)
    .then(() => {
      console.log('====================================');
      console.log('Connected to MongoDB');
      console.log('====================================');
    })
    .catch((error) => {
      console.log('====================================');
      console.log('Error connecting to MongoDB:', error);
      console.log('====================================');
      setTimeout(mongoconnection, 5000);
    });
}

mongoconnection();
