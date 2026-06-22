# 📚 Library Management System

A full-stack Library Management System built using React, Node.js, Express.js, MongoDB, and Cloudinary. The application allows students to browse books, request books, manage returns, and enables librarians/admins to manage the library efficiently.

---

## 🚀 Features

### 👨‍🎓 Student/User
- User Registration & Login
- Browse Books by Category
- Search Books
- View Book Details
- Request Book Issue
- Request Book Return
- View Borrowing History

### 👨‍💼 Librarian
- View Issue Requests
- Approve Book Issue Requests
- View Return Requests
- Approve Book Returns
- Manage Book Availability

### 👨‍💻 Admin
- Admin Authentication
- Add Librarians
- Manage Library Users
- Monitor Library Activities

### 📖 Book Management
- Add Books
- Edit Books
- Delete Books
- Upload Book Cover Images
- Categorize Books
- Track Available Copies

### ☁️ Cloud Features
- Cloudinary Image Storage
- MongoDB Atlas Database
- JWT Authentication
- Secure Password Hashing using bcrypt

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Cloud Services
- MongoDB Atlas
- Cloudinary

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure

```bash
library-management/
│
├── frontend/
│   ├── src/
    │   ├──assets/
    │   ├── components/
    │   ├── layouts
    │   ├── pages/
    │   └── utils/
    ├──App.css
    ├──App.jsx
    ├──index.css
    ├──main.jsx
│
├── backend/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── middlewares/
│   ├── schemas/
│   ├── utils/
│   └── index.js
│
└── README.md
```

---


## 🔐 User Roles

### User

- Register/Login
- Search Books
- Issue Books
- Return Books

### Librarian

- Approve Issue Requests
- Approve Return Requests
- Add Books
- Delete Books
- Edit Books

### Admin

- Add Librarians
- Manage Users
- Add Books
- Delete Books
- Edit Books

---

## 📚 Database Schema

### User

```javascript
{
  name,
  email,
  password,
  role,
  stream,
  year
}
```

### Book

```javascript
{
  title,
  author,
  category,
  isbn,
  description,
  availableCopies,
  totalCopies,
  addedBy,
  coverImage,
  cloudinaryId,
  price
}
```

### Borrow

```javascript
{
  userId,
  bookId,
  issueDate,
  dueDate,
  returnDate,
  status,
  approvedBy
}
```

---

## 🌐 Deployment

### Frontend (Vercel)

```bash
npm run build
```

Deploy the generated build to Vercel.

### Backend (Render)

- Connect GitHub Repository
- Set Root Directory to backend
- Build Command

```bash
npm install
```

- Start Command

```bash
node index.js
```

---

## Demo Credentials

-- Librarian:
    User Email : librarian@gmail.com
    Password : librarian

-- Admin:
    User Email : admin123@gmail.com
    Password : 123456

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Diviya M V**

GitHub: https://github.com/yourusername