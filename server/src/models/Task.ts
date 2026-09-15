import { Schema, model, Document } from 'mongoose';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [1, 'Task title cannot be empty'],
      maxlength: [120, 'Task title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in-progress', 'completed'],
        message: 'Status must be pending, in-progress, or completed',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask>('Task', taskSchema);
