import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';

const router = Router();

// Route: /api/tasks
router.route('/')
  .get(getTasks)
  .post(createTask);

// Route: /api/tasks/:id
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default router;
