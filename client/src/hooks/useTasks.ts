import { useState, useEffect, useCallback, useMemo } from 'react';
import { Task } from '../types/task';
import { getTasks, deleteTask } from '../services/api';
import { FilterStatus } from '../components/TaskFilter';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch tasks';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const removeTask = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete task';
      alert(`Error deleting task: ${msg}`);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    filter,
    setFilter,
    fetchTasks,
    removeTask,
    deletingId,
    setError,
  };
};
