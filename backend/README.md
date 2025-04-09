# 📦 Shipment Tracking App - Backend

This is the backend server for the Shipment Tracking App built using Express.js, TypeScript, and MongoDB.

---

## 🔧 Tech Stack

- **Express.js** (with TypeScript)
- **MongoDB** (via Mongoose)
- **Node.js**

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/shipment-tracking-app.git
cd shipment-tracking-app/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the `backend` folder

Add the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

🔐 Replace `your_mongodb_connection_string` with your actual MongoDB URI.

Example for MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shipment-app?retryWrites=true&w=majority
```

### 4. Run the development server

```bash
npm run dev
```

If everything is working fine, you'll see something like:

```plaintext
Server running on port 5000
Connected to MongoDB
```

---

# 📦 Shipment Tracking API

A backend REST API built using Express.js and MongoDB for tracking shipments and their statuses in real time.

---

## 📁 Features

- 🚚 Create new shipments
- 🔁 Add status updates to existing shipments
- 🔍 Track shipment and view its chronological statuses
- 🌱 Seed the database with initial data
- ✅ Data validation with `express-validator`
- ⚠️ Proper error handling and response codes

---

## 🛠 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **TypeScript**
- **dotenv** for environment variables
- **express-validator** for request validation

---

## 🚀 API Endpoints

### 1. Create Shipment

**POST** `/api/shipments/create`

**Request Body:**

```json
{
  "shipmentId": "SHIP123456789",
  "origin": "Ahmedabad, Gujarat",
  "destination": "Bangalore, Karnataka"
}
```

**Response:**

```json
{
  "shipment": {
    "_id": "...",
    "shipmentId": "SHIP123456789",
    "origin": "Ahmedabad, Gujarat",
    "destination": "Bangalore, Karnataka",
    "status": "Pending",
    "isDelivered": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 2. Add Shipment Status

**POST** `/api/shipments/:shipmentId/status`

**Request Body:**

```json
{
  "status": "In Transit",
  "location": "Warehouse A",
  "timestamp": "2025-04-01T10:00:00.000Z"
}
```

✅ Validates that all fields are present and timestamp is valid.

---

### 3. Track Shipment

**GET** `/api/shipments/:shipmentId/track`

**Response:**

```json
{
  "shipment": {
    "_id": "...",
    "shipmentId": "SHIP123456789",
    "origin": "Ahmedabad",
    "destination": "Bangalore",
    "status": "Pending",
    "isDelivered": false,
    ...
  },
  "statuses": [
    {
      "status": "Picked Up",
      "location": "Ahmedabad Hub",
      "timestamp": "..."
    },
    ...
  ],
  "currentStatus": "In Transit"
}
```

---

## 🌱 Seeding the Database

Run the seeder script to add sample shipments and statuses:

```bash
npm run seed
```

Make sure your `.env` has:

```env
MONGO_URI=mongodb://localhost:27017/shipment-tracking
```

---

## 🧪 Sample Seeded Data

- **Shipment SEED001**: Jaipur → Pune
  - Status Updates:
    - Picked Up at Jaipur Hub
    - In Transit on Rajasthan Highway
- **Shipment SEED002**: Mumbai → Chennai
  - Status Updates:
    - Dispatched from Mumbai Hub
    - Out for Delivery at Chennai Local Facility
    - Delivered to Customer Address
- **Shipment SEED003**: Delhi → Kolkata
  - Status Updates:
    - Label Created at Delhi Center

---

## 📄 Additional Notes

- Shipment status defaults to `"Pending"` on creation.
- `isDelivered: true` is set when a `"Delivered"` status is added.
- All status updates are sorted by `timestamp` in ascending order.
- Full validation and error messages are returned if input is invalid.
