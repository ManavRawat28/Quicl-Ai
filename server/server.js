import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {clerkMiddleware,requireAuth} from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';


const app=express();

await connectCloudinary()

app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://quicl-ai.vercel.app'
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});




app.use(express.json());
app.use(clerkMiddleware());
app.use(express.json());

app.get('/',(req,res)=>{
   res.send('Server is Live')
})
//app.use(requireAuth()) 

app.use('/api/ai',aiRouter)
app.use('/api/user',userRouter)

 const  PORT=process.env.PORT || 3000;

 app.listen(PORT,()=>{
    console.log(`Server runnning in port ${PORT}`);  
 })
