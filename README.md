# 💊 Pharmacy Management System (PHMS)

A full-stack **Pharmacy Management System** designed to manage medicines, sales, inventory, users, and reports efficiently.  
This project is built as a **university + real-world practice project**, following modern web development standards.

---

## 📌 Project Overview

The Pharmacy Management System helps pharmacies:

- Manage medicines and stock
- Handle sales and billing
- Track expired and low-stock medicines
- Manage users (Admin / Staff)
- View summarized reports and dashboard insights

The system is divided into:

- **Frontend** (React)
- **Backend** (Node.js + Express)
- **Database** (MongoDB)

---

## 🧩 Features

### 🔐 Authentication & Authorization

- Secure login system
- Role-based access:
    - **Admin**
    - **Staff / Pharmacist**

### 💊 Medicine Management

- Add, update, delete medicines
- Medicine categories
- Batch number & expiry date
- Purchase & selling price
- Stock quantity tracking
- Low-stock alerts
- Expired medicine detection

### 🧾 Sales & Billing

- Create invoices
- Multiple medicines per sale
- Automatic total & discount calculation
- Stock auto-reduction after sale
- Sales history tracking

### 📦 Inventory Management

- Stock in / stock out
- Real-time quantity updates
- Inventory overview

### 🏭 Supplier Management

- Supplier details
- Supplied medicine tracking

### 📊 Dashboard & Reports

- Total medicines
- Daily / monthly sales
- Low-stock medicines
- Expired medicines
- Best-selling medicines

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Query
- React Router
- CSS / Tailwind (optional)
- Recharts (for dashboard charts)

### Backend

- Node.js
- Express.js
- JWT Authentication
- REST API architecture

### Database

- MongoDB
- Mongoose ODM

### Tools

- Git & GitHub
- VS Code
- Postman

---

## 📁 Project Structure

phms/
│
├── phms-front/ # Frontend (React)
│ ├── src/
│ ├── public/
│ ├── .gitignore
│ └── package.json
│
├── phms-back/ # Backend (Node + Express)
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── server.js
│ ├── .gitignore
│ └── package.json
│
├── .gitignore # Root gitignore
└── README.md



