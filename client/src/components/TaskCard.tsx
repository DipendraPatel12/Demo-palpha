import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

const getStatusBadgeClass = (status: Task['status']): string => {
  switch (status) {
    case 'completed':
      return 'badge-completed';
    case 'in-progress':
      return 'badge-in-progress';
    case 'pending':
    default:
      return 'badge-pending';
  }
};

const formatStatusLabel = (status: Task['status']): string => {
  if (status === 'in-progress') return 'In Progress';
  if (status === 'completed') return 'Completed';
  return 'Pending';
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, isDeleting = false }) => {
  return (
    <article className="task-card" data-testid={`task-card-${task._id}`}>
      <div>
        <div className="task-card-header">
          <Link to={`/tasks/${task._id}`} className="task-title" id={`task-title-${task._id}`}>
            {task.title}
          </Link>
          <span className={`badge ${getStatusBadgeClass(task.status)}`}>
            <span className="badge-dot" />
            {formatStatusLabel(task.status)}
          </span>
        </div>
        {task.description && (
          <p className="task-description" style={{ marginTop: '0.65rem' }}>
            {task.description}
          </p>
        )}
      </div>

      <div className="task-card-footer">
        <span className="task-date">Created {formatDate(task.createdAt)}</span>
        <div className="task-actions">
          <Link
            to={`/tasks/${task._id}`}
            className="btn btn-secondary btn-sm"
            id={`view-btn-${task._id}`}
          >
            View
          </Link>
          <Link
            to={`/tasks/${task._id}/edit`}
            className="btn btn-secondary btn-sm"
            id={`edit-btn-${task._id}`}
          >
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task._id)}
            disabled={isDeleting}
            id={`delete-btn-${task._id}`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
};
