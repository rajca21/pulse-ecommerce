import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import productRouter from './routes/products.routes.js';
import userRouter from './routes/users.routes.js';
import orderRouter from './routes/orders.routes.js';
import categoryRouter from './routes/categories.routes.js';
import brandRouter from './routes/brands.routes.js';
import uploadRouter from './routes/upload.routes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const port = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api', (req, res) => {
  res.send('Backend is running');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/brands', brandRouter);
app.use('/api/upload', uploadRouter);

// Setting dirname to current directory & setting the folder for uploads
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
