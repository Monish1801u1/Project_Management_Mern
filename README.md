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
    # Project Management (MERN)

   Lightweight, extensible project and workspace management app built with the MERN stack (MongoDB, Express, React, Node) and TypeScript.

   **This repo contains two main folders:** `backend/` (API + services) and `client/` (Vite + React frontend).

   ## Quick Start

   Prerequisites:
   - Node.js 14+ and npm
   - MongoDB (local or Atlas)

   1. Install backend dependencies and run:

   ```powershell
   cd backend
   npm install
   npm run dev
   ```

   2. Install frontend dependencies and run:

   ```powershell
   cd client
   npm install
   npm run dev
   ```

   The frontend expects an API base URL in `client/.env.local` (example below).

   ## Environment (examples)

   Backend `.env` (backend/.env):

   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/project-management
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d
   ```

   Frontend `.env.local` (client/.env.local):

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

   ## Project Structure (high level)

   - `backend/` — Express API, models, controllers, services, validation, seeders
   - `client/` — React + TypeScript app (Vite), components, pages, routes

   See the folders for more details.

   ## Scripts

   From `backend/`:
   - `npm run dev` — start dev server (ts-node / nodemon)
   - `npm run build` — compile TypeScript
   - `npm start` — run compiled server

   From `client/`:
   - `npm run dev` — start Vite dev server
   - `npm run build` — build production assets

   ## Testing & Linting

   Check `package.json` files in each package for available test, lint, and format scripts.

   ## Contributing

   - Fork the repo and create a feature branch
   - Open a pull request with a clear description

   If you want a release tag, CI, or a PR drafted from this change, tell me and I can create it.

   ## License

   Proprietary — please contact the maintainers for details.

   ---

   Updated README — focused quick-start and env examples.
