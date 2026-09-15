import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Task } from '../types/task';
import { getTaskById, deleteTask } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';

const formatFullDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this task?')) return;
    setIsDeleting(true);
    try {
      await deleteTask(id);
      navigate('/');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete task';
      alert(`Error: ${msg}`);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading task details..." />;
  }

  if (error || !task) {
    return (
      <div>
        <ErrorAlert message={error || 'Task not found'} />
        <Link to="/" className="btn btn-secondary">
          ← Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/" className="btn btn-secondary btn-sm" id="detail-back-link">
          ← Back to Tasks
        </Link>
      </div>

      <article className="detail-card" data-testid="task-detail-card">
        <div className="detail-header">
          <div>
            <h1 className="detail-title">{task.title}</h1>
            <span
              style={{ marginTop: '0.75rem', display: 'inline-flex' }}
              className={`badge ${getStatusBadgeClass(task.status)}`}
            >
              <span className="badge-dot" />
              {formatStatusLabel(task.status)}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link
              to={`/tasks/${task._id}/edit`}
              className="btn btn-secondary"
              id="detail-edit-btn"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isDeleting}
              id="detail-delete-btn"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        <div className="detail-body">
          <h2 className="detail-description-title">Description</h2>
          <p className="detail-description-text">
            {task.description || (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                No description provided for this task.
              </span>
            )}
          </p>
        </div>

        <div className="detail-meta-grid">
          <div>
            <div className="meta-item-label">Created At</div>
            <div className="meta-item-value">{formatFullDate(task.createdAt)}</div>
          </div>
          <div>
            <div className="meta-item-label">Last Updated</div>
            <div className="meta-item-value">{formatFullDate(task.updatedAt)}</div>
          </div>
          <div>
            <div className="meta-item-label">Task Identifier</div>
            <div className="meta-item-value" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {task._id}
            </div>
          </div>
          <div>
            <div className="meta-item-label">Status</div>
            <div className="meta-item-value" style={{ textTransform: 'capitalize' }}>
              {task.status}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
