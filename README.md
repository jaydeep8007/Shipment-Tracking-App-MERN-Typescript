
# 📦 Shipment Tracker – Full Stack App

This is a full stack shipment tracking web app built using:

- **Frontend**: React, TypeScript, Tailwind CSS, Vite, React Router
- **Backend**: Node.js, Express.js, MongoDB, TypeScript
- **Other Tools**: Axios, Prettier, ESLint, dotenv, and more

---

## 🖼️ Frontend

### 🔧 Tech Stack
- React + TypeScript
- Tailwind CSS
- Vite
- React Router
- Axios

### 🚀 Setup & Run

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:5173`

---

## ⚙️ Backend

### 🔧 Tech Stack
- Node.js
- Express.js
- MongoDB (via Mongoose)
- TypeScript
- dotenv for environment variables
- Prettier + ESLint

### 📁 Folder Structure

- `/routes`: Handles API routes like `/api/shipments` and `/api/shipments/:id/track`
- `/controllers`: Route logic
- `/models`: Mongoose schemas for Shipment and Status
- `/utils`: Validation logic and status order enforcement
- `/scripts/seed.ts`: Script to seed test shipment data

### 🚀 Setup & Run

```bash
cd backend
npm install
npm run dev
```

Runs on: `http://localhost:8000`

### 🌱 Seed Data

To populate your MongoDB with sample shipments:

```bash
npm run seed
```

> ⚠ Make sure your `.env` has the correct `MONGODB_URI` set.

---

## ✅ Status Update Validation

The backend includes **status order validation logic**. Shipment statuses must follow this sequence:

```
loading → order confirmed → shipped → in transit → out for delivery → delivered
```

You cannot skip statuses or go backward. This ensures clean and realistic tracking behavior.

---

## 🧹 Code Formatting

Prettier and ESLint are configured in both frontend and backend:

### 🔨 Prettier

```bash
npm run format
```

### 🧪 ESLint

```bash
npm run lint
```

---

## 📂 Environment Setup

Frontend: Create `.env` in `/frontend`

```bash
VITE_BASE_URL=http://localhost:3000
```

Backend: Create `.env` in `/backend`

```bash
PORT=3000
MONGODB_URI=your-mongodb-uri
```

---

## 🧠 Author

Made with ❤️ by Jaydeep Parmar  
[GitHub](https://github.com/jaydeep8007) • [LinkedIn](https://www.linkedin.com/in/jaydeep8007)

---
