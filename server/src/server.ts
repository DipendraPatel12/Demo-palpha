import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    // Attempt database connection
    await connectDB();

    app.listen(PORT, () => {
      console.log(`[Server] Running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
      console.log(`[Server] API endpoints available at http://localhost:${PORT}/api/tasks`);
    });
  } catch (error) {
    console.error('[Server] Failed to start server:', (error as Error).message);
    process.exit(1);
  }
};

startServer();
