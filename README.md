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
      ## Project Management (MERN)

      A simple, practical project and workspace management application built with the MERN stack (MongoDB, Express, React, Node) and TypeScript. Use this project as a starting point for internal team tools or as a learning reference for a full-stack TypeScript app.

      Why this repo?
      - Focused feature set for small-to-medium teams: workspaces, projects, tasks, comments, members, and role-based permissions.
      - Organized TypeScript codebase that separates API, services, and UI.
      - Ready to run locally or deploy to a cloud provider with minor configuration.

      Repository layout (high level)
      - `backend/` — Express API, TypeScript code, models, controllers, services, validation, and seeders.
      - `client/` — Vite + React + TypeScript frontend, components, pages, and routes.

      What you'll find here
      - Workspace and project management features
      - Task boards, calendars, and simple analytics
      - Invitations and member management
      - Role-based access control and activity logging

      Getting started (local development)

      1) Backend

      ```powershell
      cd backend
      npm install
      cp .env.example .env   # create .env from template if present
      # Edit .env and set MONGODB_URI and JWT_SECRET
      npm run dev
      ```

      The backend runs by default on port 5000 (see `backend/.env`).

      2) Frontend

      ```powershell
      cd client
      npm install
      cp .env.example .env.local  # optional
      # Set VITE_API_URL to point at the backend (eg. http://localhost:5000/api)
      npm run dev
      ```

      Open your browser at the Vite dev server URL (usually `http://localhost:5173`).

      Environment variables (examples)

      backend/.env

      ```
      NODE_ENV=development
      PORT=5000
      MONGODB_URI=mongodb://localhost:27017/project-management
      JWT_SECRET=your_secret_key
      JWT_EXPIRE=7d
      ```

      client/.env.local

      ```
      VITE_API_URL=http://localhost:5000/api
      ```

      Core scripts you'll use

      - Backend: `npm run dev`, `npm run build`, `npm start`
      - Frontend: `npm run dev`, `npm run build`

      Notes & tips
      - Check the `backend/src/seeders` folder to populate initial roles or test data.
      - Authentication is implemented with JWT and supports OAuth providers — see `backend/src/config/passport.config.ts` for details.
      - If you run into CORS or API URL issues, verify `VITE_API_URL` and backend `PORT`.

      Contributing
      - Fork the repo, open a feature branch, and submit a PR. Keep changes focused and describe the intent in the PR.
      - If you'd like, I can create a CI workflow, add a release tag, or add badges — tell me which you'd prefer.

      Support
      - For questions or help running the project, open an issue or reach out to the maintainers.

      License
      - This project is proprietary.

      ## Ownership

      This repository and all its contents are the sole property of Monish1801u1 (repository: Monish1801u1/Project_Management_Mern). © 2026 Monish1801u1. All rights reserved.
