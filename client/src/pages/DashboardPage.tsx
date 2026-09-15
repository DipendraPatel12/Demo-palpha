import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { TaskFilter } from '../components/TaskFilter';
import { TaskCard } from '../components/TaskCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorAlert } from '../components/ErrorAlert';

export const DashboardPage: React.FC = () => {
  const {
    tasks,
    filteredTasks,
    loading,
    error,
    filter,
    setFilter,
    fetchTasks,
    removeTask,
    deletingId,
  } = useTasks();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tasks Dashboard</h1>
          <p className="page-subtitle">
            Manage your daily tasks, track progress, and organize your work.
          </p>
        </div>
        <Link to="/tasks/new" className="btn btn-primary" id="dashboard-add-task-btn">
          + Add New Task
        </Link>
      </div>

      {error && (
        <ErrorAlert
          message={error}
          onRetry={fetchTasks}
          onDismiss={() => {}}
        />
      )}

      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        tasks={tasks}
      />

      {loading ? (
        <LoadingSpinner message="Fetching tasks from server..." />
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h2 className="empty-state-title">
            {filter === 'all' ? 'No tasks found' : `No ${filter} tasks`}
          </h2>
          <p className="empty-state-subtitle">
            {filter === 'all'
              ? 'Get started by creating your very first task!'
              : `You do not have any tasks marked as "${filter}".`}
          </p>
          <Link to="/tasks/new" className="btn btn-primary btn-sm">
            Create a Task
          </Link>
        </div>
      ) : (
        <div className="task-grid" data-testid="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={removeTask}
              isDeleting={deletingId === task._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
