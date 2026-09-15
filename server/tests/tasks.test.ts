import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { Task } from '../src/models/Task';

describe('Task REST API Endpoints', () => {
  describe('GET /api/tasks', () => {
    it('should return an empty list when no tasks exist', async () => {
      const res = await request(app).get('/api/tasks');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data).toHaveLength(0);
    });

    it('should return a list of existing tasks', async () => {
      await Task.create({
        title: 'Initial Task',
        description: 'Testing task retrieval',
        status: 'pending',
      });

      const res = await request(app).get('/api/tasks');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].title).toBe('Initial Task');
    });

    it('should filter tasks by status query parameter', async () => {
      await Task.create([
        { title: 'Task 1', status: 'pending' },
        { title: 'Task 2', status: 'completed' },
      ]);

      const res = await request(app).get('/api/tasks?status=completed');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].status).toBe('completed');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task successfully', async () => {
      const newTask = {
        title: 'Learn CI/CD',
        description: 'Learn GitHub Actions and Docker',
        status: 'pending',
      };

      const res = await request(app).post('/api/tasks').send(newTask);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(newTask.title);
      expect(res.body.data.description).toBe(newTask.description);
      expect(res.body.data.status).toBe('pending');
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
    });

    it('should return 400 when task title is missing', async () => {
      const res = await request(app).post('/api/tasks').send({
        description: 'No title provided',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/title/i);
    });

    it('should return 400 when task status is invalid', async () => {
      const res = await request(app).post('/api/tasks').send({
        title: 'Valid Title',
        status: 'not-a-valid-status',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/status/i);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a task by its ID', async () => {
      const created = await Task.create({
        title: 'Single Task',
        description: 'Retrieve by ID',
        status: 'in-progress',
      });

      const res = await request(app).get(`/api/tasks/${created._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(created._id.toString());
      expect(res.body.data.title).toBe('Single Task');
    });

    it('should return 400 for an invalid ObjectId format', async () => {
      const res = await request(app).get('/api/tasks/invalid-id-123');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/invalid task id/i);
    });

    it('should return 404 for a non-existent task ID', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/tasks/${nonExistentId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/not found/i);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update task details successfully', async () => {
      const task = await Task.create({
        title: 'Old Title',
        status: 'pending',
      });

      const res = await request(app)
        .put(`/api/tasks/${task._id}`)
        .send({
          title: 'Updated Title',
          status: 'completed',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Updated Title');
      expect(res.body.data.status).toBe('completed');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task by ID', async () => {
      const task = await Task.create({
        title: 'To Be Deleted',
        status: 'pending',
      });

      const res = await request(app).delete(`/api/tasks/${task._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const check = await Task.findById(task._id);
      expect(check).toBeNull();
    });
  });
});
