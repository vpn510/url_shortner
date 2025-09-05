import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
   shortId: {
      type: String,
      required: true,
      uique: true,
   },
   redirectURL: {
      type: String,
      require: true,
   },
   visitHistory: [{ timestamp: { type: Number } }],
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   }

}, { timestamps: true });

const URL = mongoose.model('url', urlSchema);

export default URL;
