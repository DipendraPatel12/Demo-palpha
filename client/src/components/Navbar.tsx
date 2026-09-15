import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" id="nav-brand">
          <span className="navbar-brand-icon">✓</span>
          <span>TaskFlow</span>
        </Link>
        <div className="navbar-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            id="nav-dashboard-link"
          >
            Dashboard
          </Link>
          <Link
            to="/tasks/new"
            className="btn btn-primary btn-sm"
            id="nav-add-task-btn"
          >
            + Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
};
