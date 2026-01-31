# Project Report: Project Management Application

## 1. Project Overview
This is a full-stack **Project Management Application** designed to help teams collaborate, track tasks, and manage projects within workspaces. It features a modern, responsive user interface built with **React** and **Tailwind CSS**, powered by a robust **Node.js/Express** backend and **MongoDB** database.

The application allows users to create workspaces, invite team members, manage multiple projects, assign tasks, track progress through analytics, and discuss project details in real-time.

---

## 2. Technology Stack

### Frontend (Client)
- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (based on Radix UI)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Routing**: [React Router](https://reactrouter.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Calendar**: [React Big Calendar](https://github.com/jquense/react-big-calendar)
- **Drag & Drop**: [dnd-kit](https://dndkit.com/)

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ORM
- **Authentication**: [Passport.js](https://www.passportjs.org/) (Local & Google OAuth)
- **Session Management**: [Cookie Session](https://www.npmjs.com/package/cookie-session)
- **Validation**: [Zod](https://zod.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)

---

## 3. System Architecture
The application follows a **Client-Server architecture**:
1.  **Client**: Single Page Application (SPA) that consumes REST APIs.
2.  **Server**: RESTful API providing data persistence, authentication, and business logic.
3.  **Database**: NoSQL database storing relational data via Mongoose references.

---

## 4. Key Features

### 🏢 Workspace Management
- **Multi-Workspace Support**: Users can own or join multiple workspaces.
- **Member Invitations**: Invite others via secure codes.
- **Settings**: Customize workspace details.

### 📁 Project Organization
- **Create Projects**: Organize work into distinct projects.
- **Budgeting**: specific budget and currency settings per project.
- **Emoji Icons**: Visual identifiers for projects.

### ✅ Task Management
- **Task Tracking**: Create, edit, and delete tasks.
- **Kanban/List Views**: Flexible task visualization.
- **Assignments**: Assign tasks to specific team members.
- **Priorities & Status**: Track urgency (Low, Medium, High) and progress (Todo, In Progress, Done).
- **Milestones**: Mark critical project phases.

### 📊 Analytics & Reporting
- **Dashboard**: Overview of task completion and project status.
- **Reports**: Visual charts for productivity and cost tracking.

### 🗓️ Calendar & Scheduling
- **Visual Calendar**: View task due dates and project timelines.

### 💬 Collaboration
- **Discussions**: Dedicated space for project conversations.
- **Comments**: Contextual discussions on tasks.

---

## 5. Database Schema (Key Models)

### User
- Stores profile info, authentication credentials, and current active workspace context.

### Workspace
- The top-level container.
- Contains references to the **Owner**.
- Generates unique **Invite Codes** for member access.

### Project
- Linked to a **Workspace** and **Creator**.
- Tracks **Budget**, **Currency**, and **Emoji**.

### Task
- The core unit of work.
- Linked to **Project** and **Workspace**.
- **Attributes**: `status`, `priority`, `assignedTo`, `dueDate`, `cost`, `isMilestone`.
- Uses custom **Task Codes** for easy reference.

---

## 6. API Documentation Overview
The backend exposes the following primary route prefixes:

- `/auth`: Authentication (Login, Register, Logout, Google OAuth).
- `/user`: User profile management.
- `/workspace`: Workspace CRUD and member management.
- `/member`: Member role and permission handling.
- `/project`: Project CRUD operations.
- `/task`: Task creation, updates, and assignments.
- `/activity`: Analytics and usage logs.
- `/comment`: Task comments.
- `/discussion`: Project-level discussions.

---

## 7. Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI or Local MongoDB instance

### Steps
1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url>
    cd Project-Management
    ```

2.  **Install Dependencies**
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Environment Configuration**
    - Create `.env` in `backend/` with:
      ```env
      PORT=8000
      MONGO_URI=your_mongodb_uri
      SESSION_SECRET=your_secret
      CLIENT_URL=http://localhost:5173
      ```

4.  **Run the Application**
    ```bash
    # Run Backend
    cd backend
    npm run dev

    # Run Frontend
    cd client
    npm run dev
    ```

5.  **Access**: Open `http://localhost:5173` in your browser.
