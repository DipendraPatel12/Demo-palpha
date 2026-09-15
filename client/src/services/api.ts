import axios from 'axios';
import { ApiResponse, CreateTaskInput, Task, UpdateTaskInput } from '../types/task';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getTasks = async (status?: string): Promise<Task[]> => {
  const params: Record<string, string> = {};
  if (status && status !== 'all') {
    params.status = status;
  }
  const response = await apiClient.get<ApiResponse<Task[]>>('/tasks', { params });
  return response.data.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
  return response.data.data;
};

export const createTask = async (taskData: CreateTaskInput): Promise<Task> => {
  const response = await apiClient.post<ApiResponse<Task>>('/tasks', taskData);
  return response.data.data;
};

export const updateTask = async (id: string, taskData: UpdateTaskInput): Promise<Task> => {
  const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, taskData);
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
