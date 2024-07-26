import connectDB from './db/database.js';
import dotenv from 'dotenv'
dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(error)
        throw error
})
    app.listen("process.env.PORT || 8000", ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo DB connection Failed", err)
})

















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