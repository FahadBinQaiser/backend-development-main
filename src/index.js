import connectDB from './db/database.js';
import dotenv from 'dotenv'
dotenv.config({
    path:"./env"
})

connectDB()

















// const app=express();
// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log(error)
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`Port is listening on ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// })()