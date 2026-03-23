# SE NPRU TaskFlow Mini

A Fullstack Task Management Application designed as part of the SE NPRU Assignment. This system provides user authentication, task creation, viewing, updating, and deletion (CRUD).

## Tech Stack
* **Frontend:** React, Vite, TailwindCSS (v4), Zustand (Global State)
* **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT
* **Deployment Constraints:** 
  * Frontend deployed on **Vercel**
  * Backend deployed on **Render**
  * Database hosted on **MongoDB Atlas**

## File Structure
* `frontend/` - Contains the React Vite project.
* `backend/` - Contains the Node.js Express server.

## Installation & Setup (Local)

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure:
   * Set `PORT=5000`
   * Set `MONGODB_URI=` to your MongoDB Atlas connection string.
   * Set `JWT_SECRET=` to a secure random string.
4. Run the development server: `npm run server` (Runs on `http://localhost:5000`)

### 2. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and ensure `VITE_API_URL` points to your backend.
   * Example: `VITE_API_URL=http://localhost:5000`
4. Run the development server: `npm run dev`

## Deployment Guides

### Backend (Render)
1. Push your repository to GitHub.
2. Sign in to Render and create a new **Web Service**.
3. Point to your GitHub repository.
4. Set the Root Directory to `backend`.
5. Set the Build Command to: `npm install`
6. Set the Start Command to: `npm start`
7. Add the corresponding Environment Variables (`MONGODB_URI`, `JWT_SECRET`, etc.).
8. Deploy and note the Web Service URL.

### Frontend (Vercel)
1. Go to Vercel and create a new Project from your GitHub repository.
2. Set the Framework Preset to `Vite`.
3. Set the Root Directory to `frontend`.
4. Under Environment Variables, add `VITE_API_URL` and set its value to your Render deploying URL (e.g. `https://my-backend-app.onrender.com`).
5. Vercel will process the `vercel.json` file to support SPA routing properly.
6. Deploy!

## Global State Architecture
This app utilizes **Zustand** for global state management.
* `useAuthStore` manages the currently authenticated user, login/logout functions, and token persistence with LocalStorage.
* `useTaskStore` manages the tasks array, fetching them from the Express REST API utilizing the bearer token from the Auth store.

*Disclaimer: AI assistance was utilized to bootstrap the boilerplate and formulate standard REST implementation patterns as permitted by the instructions.*
