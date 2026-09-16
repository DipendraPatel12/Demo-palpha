import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '../src/components/TaskForm';

describe('TaskForm Component tests', () => {
  it('renders form inputs with initial values or defaults', () => {
    const handleCancel = vi.fn();
    const handleSubmit = vi.fn();

    render(
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText="Create Task"
      />
    );

    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Task/i })).toBeInTheDocument();
  });

  it('displays a validation error when title is empty on submit', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Save Task/i });
    await user.click(submitBtn);

    expect(screen.getByText(/Task title is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits valid form data correctly', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <TaskForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );

    const titleInput = screen.getByLabelText(/Task Title/i);
    const descInput = screen.getByLabelText(/Description/i);
    const statusSelect = screen.getByLabelText(/Status/i);
    const submitBtn = screen.getByRole('button', { name: /Save Task/i });

    await user.type(titleInput, 'Deploy with Docker');
    await user.type(descInput, 'Write Dockerfile and compose');
    await user.selectOptions(statusSelect, 'in-progress');

    await user.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Deploy with Docker',
      description: 'Write Dockerfile and compose',
      status: 'in-progress',
    });
  });
});
