import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { EditTaskPage } from './pages/EditTaskPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasks/new" element={<CreateTaskPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
