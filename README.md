# MERN Task Management Application

A clean, beginner-friendly, production-structured full-stack MERN (MongoDB, Express, React, Node.js) Task Management application built with TypeScript. This project serves as a clear, real-world foundation for learning Git, GitHub workflows, CI/CD with GitHub Actions, Docker containerization, and cloud deployment step-by-step.

---

## Table of Contents

- [1. Project Description](#1-project-description)
- [2. Tech Stack](#2-tech-stack)
- [3. Project Structure](#3-project-structure)
- [4. Prerequisites](#4-prerequisites)
- [5. Installation](#5-installation)
- [6. Environment Variable Setup](#6-environment-variable-setup)
- [7. MongoDB Setup](#7-mongodb-setup)
- [8. Running the Backend](#8-running-the-backend)
- [9. Running the Frontend](#9-running-the-frontend)
- [10. Running the Full Application (Concurrent Dev Mode)](#10-running-the-full-application-concurrent-dev-mode)
- [11. Running Tests](#11-running-tests)
- [12. Building for Production](#12-building-for-production)
- [13. Available API Endpoints](#13-available-api-endpoints)
- [14. Git Setup & Workflow Instructions](#14-git-setup--workflow-instructions)

---

## 1. Project Description

TaskFlow is a streamlined task management system designed to demonstrate core web engineering concepts without extraneous architectural overhead:

- **Frontend**: A responsive single-page application built with React, TypeScript, and Vite. It provides an interactive dashboard with real-time status filtering, task creation, inline detail viewing, task editing, and instant deletion.
- **Backend**: A modular Express REST API built with TypeScript and Mongoose, enforcing strict schema validation, consistent error responses, and HTTP status codes.
- **Testing**: End-to-end backend API tests (Vitest + Supertest + in-memory MongoDB) and frontend component integration tests (Vitest + React Testing Library).

---

## 2. Tech Stack

### Frontend
- **React (v18)** & **TypeScript**: Type-safe component architecture.
- **Vite**: Rapid build tool and development server.
- **React Router (v6)**: Client-side routing.
- **Axios**: HTTP client for REST API communication.
- **Vanilla CSS**: Custom, modern design system using CSS variables, dark-mode color palette, and micro-interactions (no heavy external UI framework like Bootstrap or MUI).
- **Vitest & React Testing Library**: Component unit and integration testing with jsdom.

### Backend
- **Node.js** & **Express.js**: Fast, minimalist web framework.
- **TypeScript**: Full type safety across models, controllers, and routes.
- **MongoDB** & **Mongoose**: Document database and object data modeling (ODM).
- **dotenv**: Secure environment variable management.
- **cors**: Cross-Origin Resource Sharing middleware.
- **Vitest & Supertest**: Integration testing suite with `mongodb-memory-server` for zero-dependency test execution.

### Tooling & Monorepo
- **npm Workspaces**: Unified dependency management across root, client, and server.
- **concurrently**: Simultaneous execution of backend and frontend in local development.

---

## 3. Project Structure

```text
mern-task-manager/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorAlert.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskFilter.tsx
│   │   │   └── TaskForm.tsx
│   │   ├── hooks/
│   │   │   └── useTasks.ts
│   │   ├── pages/
│   │   │   ├── CreateTaskPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── EditTaskPage.tsx
│   │   │   ├── NotFoundPage.tsx
│   │   │   └── TaskDetailPage.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── types/
│   │   │   └── task.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tests/
│   │   ├── setup.ts
│   │   ├── Dashboard.test.tsx
│   │   └── TaskForm.test.tsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   └── taskController.ts
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   └── Task.ts
│   │   ├── routes/
│   │   │   └── taskRoutes.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── tests/
│   │   ├── setup.ts
│   │   └── tasks.test.ts
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── .gitignore
├── package.json
└── README.md
```

---

## 4. Prerequisites

Before starting, ensure you have the following installed on your machine:

- **Node.js**: `v18.0.0` or higher (recommended: `v20.x` or `v22.x`). Check with:
  ```bash
  node -v
  ```
- **npm**: `v9.0.0` or higher (recommended: `v10.x` or `v11.x`). Check with:
  ```bash
  npm -v
  ```
- **Git**: Installed and configured. Check with:
  ```bash
  git --version
  ```
- **MongoDB**: Either a local MongoDB Community Server instance or a free cloud [MongoDB Atlas](https://www.mongodb.com/atlas) cluster. *(Note: Backend automated tests use an embedded in-memory MongoDB, so MongoDB does not need to be running for `npm test`).*

---

## 5. Installation

Clone or open the repository root:

```bash
# Navigate to the project root directory
cd mern-task-manager

# Install dependencies for root, client, and server in one step
npm install
```

Thanks to npm workspaces, `npm install` at the root automatically resolves and installs all packages for both the `client` and `server`.

---

## 6. Environment Variable Setup

### Backend Environment (`server/.env`)

Copy `server/.env.example` to `server/.env`:

```bash
# On Linux/macOS
cp server/.env.example server/.env

# On Windows (PowerShell)
Copy-Item server/.env.example server/.env
```

Contents of `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_task_manager
```

> **Security Note:** Never commit `.env` to Git. It is already added to `.gitignore`.

### Frontend Environment (`client/.env`)

Copy `client/.env.example` to `client/.env`:

```bash
# On Linux/macOS
cp client/.env.example client/.env

# On Windows (PowerShell)
Copy-Item client/.env.example client/.env
```

Contents of `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 7. MongoDB Setup

### Option A: Local MongoDB (Default)
If you have MongoDB installed locally as a service:
1. Ensure the service is running (`net start MongoDB` on Windows or `sudo systemctl start mongod` on Linux).
2. Use the connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/mern_task_manager
   ```

### Option B: MongoDB Atlas (Free Cloud Database)
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free M0 cluster.
3. Under **Database Access**, create a database user and password.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) for development.
5. In **Database Deployment**, click **Connect** -> **Drivers** -> copy your URI:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mern_task_manager?retryWrites=true&w=majority
   ```

---

## 8. Running the Backend

To run only the Express backend:

```bash
# From the project root:
npm run dev:server

# Or directly from the server directory:
cd server
npm run dev
```

The backend starts at `http://localhost:5000`. You will see:
```
[MongoDB] Connected successfully to host: ...
[Server] Running in development mode on http://localhost:5000
[Server] API endpoints available at http://localhost:5000/api/tasks
```

Health check endpoint:
```
GET http://localhost:5000/api/health
```

---

## 9. Running the Frontend

To run only the Vite React frontend:

```bash
# From the project root:
npm run dev:client

# Or directly from the client directory:
cd client
npm run dev
```

The frontend will start at `http://localhost:5173`. Open your browser to view the application.

---

## 10. Running the Full Application (Concurrent Dev Mode)

To run both backend and frontend simultaneously with a single command:

```bash
npm run dev
```

This uses `concurrently` to stream labeled logs from both the server and client in your terminal.

---

## 11. Running Tests

Automated tests are included for both frontend and backend to prepare for GitHub Actions CI/CD pipelines:

### Run All Tests
```bash
npm test
```

### Run Only Backend Tests
Backend tests use Vitest, Supertest, and `mongodb-memory-server` (an isolated in-memory Mongo daemon). They do not require a live MongoDB service:
```bash
npm run test:server
```

### Run Only Frontend Tests
Frontend tests use Vitest, React Testing Library, and jsdom:
```bash
npm run test:client
```

---

## 12. Building for Production

To test production bundling and compile TypeScript:

### Build Everything
```bash
npm run build
```

### Build Only Frontend
Compiles TypeScript and bundles static assets into `client/dist`:
```bash
npm run build:client
```

### Build Only Backend
Compiles TypeScript into `server/dist`:
```bash
npm run build:server
```

---

## 13. Available API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body | Response Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status | None | 200 OK |
| `GET` | `/api/tasks` | Get all tasks (optional `?status=pending`) | None | 200 OK |
| `GET` | `/api/tasks/:id` | Get single task by ID | None | 200 OK / 400 / 404 |
| `POST` | `/api/tasks` | Create a new task | `{ title, description?, status? }` | 201 Created / 400 |
| `PUT` | `/api/tasks/:id` | Update task details | `{ title?, description?, status? }` | 200 OK / 400 / 404 |
| `DELETE` | `/api/tasks/:id` | Delete a task | None | 200 OK / 400 / 404 |

### Example Request Payloads

#### Create Task (`POST /api/tasks`)
```json
{
  "title": "Learn CI/CD with GitHub Actions",
  "description": "Understand pipelines, triggers, and automated testing.",
  "status": "pending"
}
```

#### Successful Create Response (`201 Created`)
```json
{
  "success": true,
  "data": {
    "_id": "660c2b5f891a2e4b6c3104e1",
    "title": "Learn CI/CD with GitHub Actions",
    "description": "Understand pipelines, triggers, and automated testing.",
    "status": "pending",
    "createdAt": "2026-09-15T18:00:00.000Z",
    "updatedAt": "2026-09-15T18:00:00.000Z"
  }
}
```

---

## 14. Git Setup & Workflow Instructions

To initialize and link your repository to GitHub:

### 1. Initialize Local Git
```bash
git init
git add .
git commit -m "feat: initial MERN task management application setup"
```

### 2. Create a Remote Repository on GitHub
1. Navigate to [github.com/new](https://github.com/new).
2. Enter `mern-task-manager` as the repository name.
3. Keep the repository Public or Private (do not initialize with README, .gitignore, or license as they are already created here).
4. Click **Create repository**.

### 3. Connect Local Repository and Push
```bash
# Rename default branch to main (if not already)
git branch -M main

# Add remote origin
git remote add origin https://github.com/<your-username>/mern-task-manager.git

# Push initial code to main branch
git push -u origin main
```

### 4. Git Branching Practice for Learning
When adding new features (such as CI/CD workflows or Docker configurations later):
```bash
# Create and switch to a feature branch
git checkout -b feature/setup-docker

# Make changes, then stage and commit
git add .
git commit -m "feat: add Dockerfile and docker-compose configuration"

# Push branch to GitHub
git push origin feature/setup-docker
```
Open a Pull Request on GitHub to practice code review and merge flows!
