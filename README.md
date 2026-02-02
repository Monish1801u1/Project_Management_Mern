# Project Management System (MERN)

A comprehensive full-stack Project Management application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This system enables teams to collaborate effectively on projects with features like workspace management, task tracking, discussions, and role-based access control.

##  Table of Contents
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)

##  Tech Stack

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Passport.js** - Authentication middleware

##  Features

### Core Features
- **User Authentication & Authorization** - Secure login with JWT and OAuth support
- **Workspace Management** - Create and manage multiple workspaces
- **Project Management** - Organize projects within workspaces
- **Task Management** - Create, assign, and track tasks with status updates
- **Team Collaboration** - Add team members and manage workspace invites
- **Comments & Discussions** - Collaborate on tasks and projects with threaded discussions
- **Activity Tracking** - Monitor all activities within workspace and projects
- **Role-based Access Control** - Flexible permission system for different roles

### User Management
- Account creation and management
- Multiple account provider support
- Member invitations and workspace assignments
- Role and permission management

##  Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (v4.4 or higher) - Local or Atlas cluster
- **Git** for version control

##  Project Structure

```
Project-Management/
 backend/
    src/
       @types/          # TypeScript type definitions
       config/          # Configuration files (app, database, http, passport)
       controllers/      # Route controllers
       enums/           # Enum definitions
       middlewares/      # Express middlewares
       models/          # MongoDB models
       routes/          # API routes
       services/        # Business logic services
       seeders/         # Database seeders
       utils/           # Utility functions
       validation/      # Input validation
       index.ts         # Application entry point
    tsconfig.json        # TypeScript configuration
    package.json         # Dependencies
 client/
    src/
       components/      # Reusable React components
       context/         # React context providers
       hoc/             # Higher-order components
       hooks/           # Custom React hooks
       layout/          # Layout components
       lib/             # Utility libraries
       page/            # Page components
       routes/          # Route definitions
       types/           # TypeScript types
       App.tsx          # Root component
       main.tsx         # Entry point
    public/              # Static assets
    vite.config.ts       # Vite configuration
    tailwind.config.js   # Tailwind CSS configuration
    package.json         # Dependencies
 README.md
 PROJECT_REPORT.md
```

##  Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `backend` directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/project-management
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the `client` directory:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

##  Running the Application

### Development Mode

**Option 1: Run backend and frontend separately**
- Backend: Navigate to `backend/` and run `npm run dev`
- Frontend: Navigate to `client/` and run `npm run dev`

**Option 2: Run from root (if configured)**
```bash
npm run dev
```

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
```

##  API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Workspace Routes
- `GET /api/workspaces` - Get all workspaces
- `POST /api/workspaces` - Create workspace
- `PUT /api/workspaces/:id` - Update workspace
- `DELETE /api/workspaces/:id` - Delete workspace

### Project Routes
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Task Routes
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### User & Member Routes
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/members` - Get workspace members
- `POST /api/members/invite` - Invite member

### Comments & Discussions
- `GET /api/comments` - Get comments
- `POST /api/comments` - Create comment
- `GET /api/discussions` - Get discussions
- `POST /api/discussions` - Create discussion

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is proprietary. All rights reserved.

##  Support

For support or questions, please contact the development team.
