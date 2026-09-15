import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { DashboardPage } from '../src/pages/DashboardPage';
import * as api from '../src/services/api';
import { Task } from '../src/types/task';

vi.mock('../src/services/api');

const mockTasks: Task[] = [
  {
    _id: '1',
    title: 'Setup Git Repository',
    description: 'Initialize git and push to GitHub',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Configure CI/CD Pipeline',
    description: 'Create GitHub Actions workflow',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe('DashboardPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dashboard heading and add task button', async () => {
    vi.spyOn(api, 'getTasks').mockResolvedValue([]);

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tasks Dashboard/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\+ Add New Task/i })).toBeInTheDocument();
  });

  it('renders tasks returned from the api', async () => {
    vi.spyOn(api, 'getTasks').mockResolvedValue(mockTasks);

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Setup Git Repository')).toBeInTheDocument();
      expect(screen.getByText('Configure CI/CD Pipeline')).toBeInTheDocument();
    });
  });

  it('filters tasks when clicking status filter buttons', async () => {
    const user = userEvent.setup();
    vi.spyOn(api, 'getTasks').mockResolvedValue(mockTasks);

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Setup Git Repository')).toBeInTheDocument();
    });

    // Click 'Pending' filter
    const pendingButton = screen.getByRole('tab', { name: /pending/i });
    await user.click(pendingButton);

    expect(screen.queryByText('Setup Git Repository')).not.toBeInTheDocument();
    expect(screen.getByText('Configure CI/CD Pipeline')).toBeInTheDocument();
  });
});
