import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Task, TaskStatus } from '../models/Task';

const VALID_STATUSES: TaskStatus[] = ['pending', 'in-progress', 'completed'];

// @desc    Get all tasks (with optional status filter)
// @route   GET /api/tasks
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.query;
    const filter: Record<string, unknown> = {};

    if (status && typeof status === 'string' && VALID_STATUSES.includes(status as TaskStatus)) {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
      return;
    }

    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, status } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      res.status(400).json({
        success: false,
        message: 'Task title is required',
      });
      return;
    }

    if (status && !VALID_STATUSES.includes(status as TaskStatus)) {
      res.status(400).json({
        success: false,
        message: 'Status must be pending, in-progress, or completed',
      });
      return;
    }

    const task = await Task.create({
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
      status: status || 'pending',
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing task
// @route   PUT /api/tasks/:id
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
      return;
    }

    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      res.status(400).json({
        success: false,
        message: 'Task title cannot be empty',
      });
      return;
    }

    if (status !== undefined && !VALID_STATUSES.includes(status as TaskStatus)) {
      res.status(400).json({
        success: false,
        message: 'Status must be pending, in-progress, or completed',
      });
      return;
    }

    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (status !== undefined) updates.status = status;

    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
      return;
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
