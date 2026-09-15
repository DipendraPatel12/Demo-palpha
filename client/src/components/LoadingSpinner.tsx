import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};
