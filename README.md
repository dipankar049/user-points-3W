# 🏅 User Points Management System

A full-stack web application to manage users and allow daily point claiming with cooldown. Users can view their claim history, and admins can monitor all claims. Built using **MERN stack**.

## 🌐 Live Links

- 🔗 [Click here to try the User Points System](https://user-points-3-w.vercel.app/)
---

## 📦 Features

- ➕ Add new users
- 🎁 Claim points
- 📜 View claim history
- ⚙️ Paginated claim history API
- 🌐 Connected to MongoDB Atlas
- 🔒 .env setup for environment config

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Lucide Icons

### Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

---

📝 Folder Structure

```
root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
|   ├── server.js
│   └── .env
├── frontend/
|   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
```
---

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
cd backend
npm install
# Create .env file
MONGO_URI=your_mongodb_atlas_uri
PORT=8000

npm run dev
```

---

🧑‍💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```
---

