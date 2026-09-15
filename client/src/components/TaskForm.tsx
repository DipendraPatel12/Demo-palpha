import React, { useState } from 'react';
import { TaskStatus } from '../types/task';

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
}

interface TaskFormProps {
  initialValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => Promise<void>;
  isSubmitting?: boolean;
  submitButtonText?: string;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitButtonText = 'Save Task',
  onCancel,
}) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [status, setStatus] = useState<TaskStatus>(initialValues?.status || 'pending');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setValidationError('Task title is required');
      return;
    }

    setValidationError(null);
    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="task-title-input" className="form-label">
          Task Title <span className="required">*</span>
        </label>
        <input
          id="task-title-input"
          type="text"
          className="form-input"
          placeholder="e.g. Set up CI/CD workflow"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (validationError) setValidationError(null);
          }}
          disabled={isSubmitting}
          maxLength={120}
          required
        />
        {validationError && (
          <span className="form-error-msg" role="alert">
            {validationError}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="task-description-input" className="form-label">
          Description
        </label>
        <textarea
          id="task-description-input"
          className="form-textarea"
          placeholder="Add any helpful details or context..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          maxLength={1000}
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-status-select" className="form-label">
          Status
        </label>
        <select
          id="task-status-select"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          disabled={isSubmitting}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          id="form-cancel-btn"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          id="form-submit-btn"
        >
          {isSubmitting ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};
