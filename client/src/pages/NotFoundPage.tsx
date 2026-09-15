import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="empty-state" style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <div className="empty-state-icon">🔍</div>
      <h1 className="empty-state-title">Page Not Found</h1>
      <p className="empty-state-subtitle">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary" id="not-found-home-btn">
        Return to Dashboard
      </Link>
    </div>
  );
};
