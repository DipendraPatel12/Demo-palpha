import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm, TaskFormData } from '../components/TaskForm';
import { createTask } from '../services/api';
import { ErrorAlert } from '../components/ErrorAlert';

export const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleCreate = async (formData: TaskFormData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await createTask(formData);
      navigate('/');
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Failed to create task';
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Create New Task</h1>
          <p className="page-subtitle">Add a new task to your workspace</p>
        </div>
      </div>

      {apiError && (
        <ErrorAlert
          message={apiError}
          onDismiss={() => setApiError(null)}
        />
      )}

      <TaskForm
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
        submitButtonText="Create Task"
        onCancel={() => navigate('/')}
      />
    </div>
  );
};
