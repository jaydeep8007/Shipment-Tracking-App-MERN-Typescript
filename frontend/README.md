# 📦 Shipment Tracker Backend

This is the **Backend** for the Shipment Tracker project, built with **Node.js**, **Express.js**, and **TypeScript**, using **MongoDB** as the database.

The backend provides APIs to:

- Create and manage shipment records
- Track status updates with timestamped location data
- Enforce business logic such as strict status ordering
- Seed initial data to MongoDB

---

## 🚀 Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Vite** + **TSConfig paths**
- **ESLint** + **Prettier** for linting and formatting
- **Zod** for input validation
- **Dotenv** for managing environment variables

---

## 📁 Project Structure

```bash
backend/
├── src/
│   ├── config/            # DB connection, env setup
│   ├── controllers/       # Route logic for shipments and tracking
│   ├── models/            # Mongoose models (Shipment, Status)
│   ├── routes/            # Express routes
│   ├── seed/              # Seed script to populate test data
│   ├── utils/             # Helper functions, constants
│   └── index.ts           # Main entry point
├── .env                   # Env variables
├── .eslintrc.cjs          # ESLint config
├── .prettierrc            # Prettier config
├── package.json
├── tsconfig.json
└── README.md              # You're here!
```

---

## ✅ Key Features

### 🔐 Status Validation Logic

The shipment status must follow a **strict progression order**:

```ts
loading → order confirmed → shipped → in transit → out for delivery → delivered
```

- Any skipped or invalid status transitions are **rejected with proper error messages**.
- Validation is done using a predefined array and index-based comparison.

### 🧼 Prettier + ESLint

Both **Prettier** and **ESLint** are set up for code consistency:

```bash
npm run lint       # Lint the code using ESLint
npm run format     # Format the codebase using Prettier
```

Prettier settings (`.prettierrc`):

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### 🌱 Seed Data

Run the seed script to insert dummy shipment data into the database:

```bash
npm run seed
```

This will insert:

- A sample shipment
- Pre-filled status events (loading, shipped, etc.)

### 📦 API Endpoints

- `POST /api/shipments` - Create a new shipment
- `POST /api/shipments/:id/status` - Add a new status with location
- `GET /api/shipments/:id/track` - Get full tracking info with latest status

---

## 🛠 Scripts

```json
"scripts": {
  "dev": "ts-node-dev src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "seed": "ts-node src/seed/seed.ts",
  "format": "prettier --write .",
  "lint": "eslint . --ext .ts"
}
```

---

## 📌 Environment Variables (.env)

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/shipment-tracker
```

---

## 🧪 Future Improvements

- Add authentication (JWT)
- Role-based access (admin/customer)
- Pagination on shipment lists
- Swagger API documentation

---

## 👨‍💻 Author

**Jaydeep Parmar**  
[GitHub](https://github.com/jaydeep8007) • [LinkedIn](https://www.linkedin.com/in/jaydeep8007)

---

> Built with ❤️ to simplify shipment tracking for everyone.
