import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app: Application = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Task Manager API is running healthy',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/tasks', taskRoutes);

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
