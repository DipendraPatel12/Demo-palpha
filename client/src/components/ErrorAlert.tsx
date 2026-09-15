import React from 'react';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss, onRetry }) => {
  return (
    <div className="alert alert-error" role="alert">
      <span>⚠️ {message}</span>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {onRetry && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onRetry}
            id="alert-retry-btn"
          >
            Retry
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onDismiss}
            aria-label="Dismiss alert"
            id="alert-dismiss-btn"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
