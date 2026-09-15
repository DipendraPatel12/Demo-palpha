import mongoose from 'mongoose';

export const connectDB = async (mongoUri?: string): Promise<typeof mongoose> => {
  const uri = mongoUri || process.env.MONGO_URI || 'mongodb://localhost:27017/mern_task_manager';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${(error as Error).message}`);
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('[MongoDB] Disconnected successfully');
  } catch (error) {
    console.error(`[MongoDB] Disconnect error: ${(error as Error).message}`);
  }
};
