# 📓 Micro-Journal

A simple, aesthetic **micro-journaling web app** for daily mood & reflection tracking.  
Built with **React + Flask** and featuring mood sentiment analysis and interactive mood trends.

---

## ✨ Features

✅ Write daily journal entries  
✅ Auto-detect **mood sentiment** (happy / neutral / sad)  
✅ Visualize **mood trends** in charts  
✅ Edit & delete journal entries  
✅ Profile page with **avatar picker & username editing**  
✅ Responsive, pastel-themed UI  
✅ Toast notifications for user actions  
✅ User authentication (secure login & registration)

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React, Axios, Recharts, React Toastify | Flask, Flask-CORS, SQLAlchemy | SQLite (can upgrade to PostgreSQL) |

---

## 📸 Screenshots

### 📝 Journal Entry

<img src="screenshots/Screenshot 2025-06-18 181303.png" alt="Journal Entry" width="600"/>

### 📈 Mood Trend Chart

<img src="screenshots/Screenshot 2025-06-18 181317.png" alt="Mood Trend Chart" width="600"/>

### 👤 Profile Page

<img src="screenshots/Screenshot 2025-06-18 181352.png" alt="Profile Page" width="600"/>

<img src="screenshots/Screenshot 2025-06-18 181422.png" alt="Profile Page2" width="600"/>

---

## 🚀 Installation & Running Locally

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/yourusername/microjournal.git
cd micro-journal
```

### 2️⃣ Backend Setup (Flask API)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Initialize DB (SQLite)
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Run server (default: http://127.0.0.1:5000)
python run.py
```

### 3️⃣ Frontend Setup (React)

```bash
cd ../frontend

# Install dependencies
npm install

# Start React app (default: http://localhost:3000)
npm start
```

### 4️⃣ Environment Notes

API Base URL → in /frontend/src/api/api.js
→ set it to your Flask backend URL (local or deployed)

SQLite DB auto-created as journal.db

For production: can switch to PostgreSQL and use .env config
