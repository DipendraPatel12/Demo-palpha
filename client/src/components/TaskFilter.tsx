import React from 'react';
import { Task } from '../types/task';

export type FilterStatus = 'all' | 'pending' | 'in-progress' | 'completed';

interface TaskFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  tasks: Task[];
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
  tasks,
}) => {
  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const filters: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="filters-bar" role="tablist" aria-label="Task status filters">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            className={`filter-btn ${isActive ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
            id={`filter-btn-${filter.value}`}
            role="tab"
            aria-selected={isActive}
          >
            <span>{filter.label}</span>
            <span className="filter-count">{counts[filter.value]}</span>
          </button>
        );
      })}
    </div>
  );
};
