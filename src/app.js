import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
// this bottom function is a middle ware, we use app.get when we make routes in app.js file but if the routes are defined seperately in a file then we use this method to display the userRouter on the prefered destination.
app.use("/api/v1/users",userRouter)
export default app;