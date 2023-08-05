import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import hotelsRoutes from './routes/hotels.js'
import roomsRoutes from './routes/rooms.js'
import cookieParser from 'cookie-parser';


// midelwares
const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongo Db connected"))
.catch((err)=>console.log(err))

app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/hotels",hotelsRoutes)
app.use("/api/rooms",roomsRoutes)

app.use((err, req, res, next) => {
  const errstatus = err.status || 500;
  const errormessage = err.message || "Something went wrong"; 
  return res.status(500).json({ 
    success: false, 
    status: errstatus,
    message: errormessage,
    stack: err.stack
  });
});

app.listen(8800, () => {
  console.log('Backend is working');
});