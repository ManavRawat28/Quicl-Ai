import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {clerkMiddleware,requireAuth} from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';


const app=express();

await connectCloudinary()

const allowedOrigins = [
  'http://localhost:5173',   // Vite
  'http://localhost:3000',   // React / Next
  'https://quicl-ai.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.options('*', cors());

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
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
