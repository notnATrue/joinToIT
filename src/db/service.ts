require("dotenv").config();

import mongoose from 'mongoose';

export class DataBase {
  static async connect(): Promise<void> {
    const uri = process.env.MONGO_URI;
    const db = mongoose.connect(uri, { useNewUrlParser: true , autoIndex: false }).catch((error) => { console.log(error); });
  }
}


