# 🌱 Community Cleanliness & Public Issue Reporting System

A full-stack **MERN Stack** web application that empowers communities to report damaged public property, view existing issues, and contribute through donations — all in one dynamic and responsive platform.

🌐 **Live Site:**  
https://community-cleanliness.netlify.app/allissues  

📦 **GitHub Repository:**  
https://github.com/hakimcolor/Community-cleanliness-and-issue.git  

---

## 🚀 Project Overview

**Community Cleanliness** is a community-driven platform where users can:

- 📸 Report damaged public property (roads, dustbins, street lights, etc.)
- 👀 View previously reported public issues
- 💰 Donate to specific issues they want to support
- 📊 Track donation history from a personal dashboard
- 📥 Download donation reports as a sheet
- 📱 Enjoy a fully responsive and dynamic UI (mobile & desktop)
- 🔗 Navigate using dynamic routes and protected paths

This project is built as a **Full Stack MERN application** with a focus on real-world usability, clean UI, and scalable architecture.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router (Dynamic Routing)
- Tailwind CSS
- Axios
- Responsive UI Design

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- REST API

### Other Tools
- Netlify (Frontend Hosting)
- MongoDB Atlas
- Git & GitHub

---

## ✨ Core Features

- ✅ User Authentication (Login / Register)
- 📝 Post public issues with details & images
- 👁️ View all community issues
- 💳 Donate to any issue
- 📊 User Dashboard with donation history
- 📥 Download donation data sheet
- 🔐 Protected Routes (Dashboard, Post Issue)
- 📱 Mobile-first responsive design
- ⚡ Dynamic UI & dynamic paths

---

## 🔐 Authentication Flow

- Users must **register or login** to:
  - Post an issue
  - Donate to issues
  - Access dashboard

- Public users can:
  - View all posted issues

---

## 📂 Project Structure (Simplified)
Community-cleanliness-and-issue
│
├── client # React frontend
│ ├── src
│ ├── components
│ ├── pages
│ └── routes
│
├── server # Node & Express backend
│ ├── routes
│ ├── controllers
│ ├── models
│ └── middleware
│
└── README.md  

---

## 🧑‍💻 How to Clone & Run the Project Locally
### .env
PORT=5000 

  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
     
     
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/hakimcolor/Community-cleanliness-and-issue.git
cd Community-cleanliness-and-issue
cd server
npm install
npm run dev

**cd client
npm install
npm start
**
