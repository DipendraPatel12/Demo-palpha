import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../types/task';
import { getTaskById, updateTask } from '../services/api';
import { TaskForm, TaskFormData } from '../components/TaskForm';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';

export const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getTaskById(id);
        setTask(data);
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Task not found';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (formData: TaskFormData) => {
    if (!id) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await updateTask(id, formData);
      navigate(`/tasks/${id}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update task';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading task details..." />;
  }

  if (error && !task) {
    return (
      <div>
        <ErrorAlert message={error} />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          ← Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Task</h1>
          <p className="page-subtitle">Update your task information</p>
        </div>
      </div>

      {error && (
        <ErrorAlert message={error} onDismiss={() => setError(null)} />
      )}

      {task && (
        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description || '',
            status: task.status,
          }}
          onSubmit={handleUpdate}
          isSubmitting={isSubmitting}
          submitButtonText="Update Task"
          onCancel={() => navigate(`/tasks/${task._id}`)}
        />
      )}
    </div>
  );
};
