import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   role: {
      type: String,
      required: true,
      default: "NORMAL"

   }
}, { timestamp: true })

const User = mongoose.model('users', userSchema)

export default User;