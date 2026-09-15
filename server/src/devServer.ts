import { MongoMemoryServer } from 'mongodb-memory-server';
import app from './app';
import { connectDB } from './config/db';
import { Task } from './models/Task';

const PORT = process.env.PORT || 5000;

const startDevServer = async (): Promise<void> => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // If local MongoDB is not running or memory mode requested, use in-memory instance
    console.log('[DevServer] Starting development in-memory MongoDB instance...');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();

    await connectDB(mongoUri);

    // Seed initial demo tasks if collection is empty
    const count = await Task.countDocuments();
    if (count === 0) {
      await Task.create([
        {
          title: 'Learn Git & GitHub Basics',
          description: 'Master branches, commits, pull requests, and merge conflicts.',
          status: 'completed',
        },
        {
          title: 'Understand CI/CD Workflows',
          description: 'Learn GitHub Actions syntax, triggers, jobs, and automated test runners.',
          status: 'in-progress',
        },
        {
          title: 'Containerize Application with Docker',
          description: 'Create multi-stage Dockerfiles for client and server, then write docker-compose.yml.',
          status: 'pending',
        },
      ]);
      console.log('[DevServer] Seeded 3 sample tasks for development demo.');
    }

    app.listen(PORT, () => {
      console.log(`[DevServer] Express server running on http://localhost:${PORT}`);
      console.log(`[DevServer] API available at http://localhost:${PORT}/api/tasks`);
    });
  } catch (error) {
    console.error('[DevServer] Error starting dev server:', (error as Error).message);
    process.exit(1);
  }
};

startDevServer();
