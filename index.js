import express from 'express';
import connectDB from './connect.js';
import path from 'path'
import cookieParser from 'cookie-parser';
import { checkForAuthentication, restrictTo, } from './middleware/auth.js';

import dotenv from 'dotenv'
dotenv.config();

import urlRoute from './routes/url.js';
import staticRoute from './routes/staticRouter.js'
import userRoute from './routes/userRouter.js'

// import URL from './models/url.js'
const app = express();
const PORT = 3001;

// connectDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("Database connected successfully"));
try {
   connectDB(process.env.server).then(() => console.log("Database connected successfully"))
} catch (error) {
   console.log({ error: error.message });
}


app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(['NORMAL']), urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));

