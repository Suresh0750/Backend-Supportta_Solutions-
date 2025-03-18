import express from "express"
import cors from 'cors' 
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
// import { CLIENT_URL } from './config/env'; 
import userRouter from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandle.middleware";
// import postRouter from "./presentation/routes/postRoutes"; 
import morgan from 'morgan'
dotenv.config()


const app = express()

// * cors configurations
app.use(cors({
    origin : "CLIENT_URL",
    credentials : true,
}))
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.use('/api/user',userRouter)
// app.use('/api/post',postRouter)


app.use(errorHandler)
export default app;