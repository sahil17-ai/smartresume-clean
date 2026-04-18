# SmartResume AI — Setup Guide 🚀

## 📁 Project Structure
```
smartresume-upgraded/
├── backend/          # FastAPI Python server
│   ├── main.py
│   ├── routes/
│   │   ├── auth.py
│   │   ├── admin.py  ← NEW: Admin Panel API
│   │   ├── resume.py
│   │   ├── predict.py
│   │   └── jd_match.py
│   └── requirements.txt
└── frontend/         # React + Vite app
    └── src/
        ├── App.jsx
        └── pages/
            ├── AdminPanel.jsx  ← NEW: Admin UI
            ├── Dashboard.jsx
            └── ...
```

---

## 🛠️ Setup & Run करा

### Method 1: Manual (Recommended for Development)

#### Step 1 — Backend चालवा
```bash
cd backend

# Python virtual environment बनवा
python -m venv venv

# Activate करा
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Dependencies install करा
pip install -r requirements.txt

# Server start करा
python main.py
```
Backend: http://localhost:8000

#### Step 2 — Frontend चालवा (नवीन terminal मध्ये)
```bash
cd frontend

# Node modules install करा
npm install

# Dev server start करा
npm run dev
```
Frontend: http://localhost:5173

---

### Method 2: Docker Compose (One Command)
```bash
# Project root मध्ये जा
cd smartresume-upgraded

# Build + Run
docker-compose up --build

# Background मध्ये चालवायचे असल्यास
docker-compose up --build -d
```
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

---

## 🔐 Admin Panel

### Admin Panel ला Access करा
URL: http://localhost:5173/admin

किंवा App मध्ये navigate करताना:
```js
navigate("admin")
```

### Default Admin Credentials
| Field | Value |
|-------|-------|
| Email | admin@smartresume.com |
| Password | admin123 |

### ⚠️ Production साठी Password बदला!
Backend `.env` file तयार करा किंवा docker-compose.yml मध्ये set करा:
```env
ADMIN_EMAIL=youremail@example.com
ADMIN_PASSWORD=yourStrongPassword123
JWT_SECRET=your-random-secret-key
```

### Admin Panel Features
- 📊 **Stats** — Total users, Total resumes
- 👥 **User List** — सर्व registered users
- 🗑️ **Delete User** — कोणताही user delete करा
- 🔑 **Reset Password** — User चा password reset करा

---

## 🌐 API Endpoints

### Auth
- `POST /api/auth/register` — नवीन user register
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Current user info

### Admin (Admin token required)
- `POST /api/admin/login` — Admin login
- `GET /api/admin/stats` — Users + Stats
- `DELETE /api/admin/users/{email}` — User delete
- `POST /api/admin/users/{email}/reset-password` — Password reset

### Resume
- `GET /api/resume/` — Resumes list
- `POST /api/resume/` — Resume save
- `GET /api/health` — Health check

---

## 🔧 Common Issues

**Port already in use?**
```bash
# Backend port बदला (main.py मध्ये)
uvicorn.run("main:app", host="0.0.0.0", port=8001)

# Frontend vite.config.js मध्ये
server: { port: 5174 }
```

**CORS Error?**
`backend/main.py` मध्ये frontend URL add करा:
```python
allow_origins=["http://localhost:5173", "http://localhost:3000", "http://yoursite.com"]
```
