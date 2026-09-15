export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
}
