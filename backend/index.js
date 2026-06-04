import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js';
import userRoutes from './routes/UserRoutes.js';

const app = express();
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(cookieParser());

//route for userRoutes
app.use('/api/auth', userRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    connectDB();
});