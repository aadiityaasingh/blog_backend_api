# 📝 Blog Backend System

A clean, production-ready RESTful API for a full-featured blog platform. Built with **Node.js**, **Express.js**, and **MongoDB** — it handles authentication, blog posts, comments, likes, bookmarks, and role-based access control for `admin`, `author`, and `user` roles.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB + Mongoose |
| Authentication | JWT + HTTP-only Cookies |
| Password Hashing | bcrypt |
| File Uploads | Multer |
| Unique IDs | UUID |

---

## ✨ Features

- 🔐 **Auth** — Register and login with JWT stored in HTTP-only cookies
- 📝 **Posts** — Create, read, update, and delete blog posts (admin/author only)
- 💬 **Comments** — Add and delete comments on posts (authenticated users)
- ❤️ **Likes** — Like and unlike posts with like count retrieval
- 🔖 **Bookmarks** — Save and remove bookmarked posts, view personal bookmarks
- 🛡 **RBAC** — Role-based access control with `admin`, `author`, and `user` roles
- 🔒 **Protected Routes** — Auth and role middleware guards sensitive endpoints

---

## 📁 Project Structure

```
blog-backend/
├── src/
│   ├── controllers/
│   │   ├── auth.Controller.js        # Register, login
│   │   ├── bookMark.Controller.js    # Save, remove, get bookmarks
│   │   ├── comment.Controller.js     # Create, delete, get comments
│   │   ├── like.Controller.js        # Like, unlike, get likes
│   │   └── post.Controller.js        # CRUD for posts
│   ├── db/
│   │   └── db.js                     # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.Middleware.js        # JWT protect middleware
│   │   └── role.middleware.js        # Role-based access control
│   ├── models/
│   │   ├── bookMark.model.js
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── post.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js            # /api/auth
│   │   ├── comment.routes.js         # /api/comments
│   │   ├── post.Routes.js            # /api/posts
│   │   ├── test.Routes.js            # /api/test
│   │   └── user.routes.js            # /api/users
│   └── utils/
│       └── generateToken.js          # JWT token generator
├── app.js                            # Express app, middleware & route mounting
├── server.js                         # Entry point
├── .env
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aadiityaasingh/blog-backend.git
cd blog-backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
touch .env
# Fill in your values (see below)

# 4. Start the server
node server.js
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret_key
```

---

## 📡 API Reference

**Base URL:** `http://localhost:PORT`

> 🔒 **[Protected]** — Requires a valid JWT cookie (set automatically on login)  
> 🛡 **[admin]** / **[author]** — Requires that specific role

---

### 🔐 Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT cookie |

```json
// POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "role": "author"
}

// POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### 📝 Posts — `/api/posts`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/posts` | Public | Get all posts |
| POST | `/api/posts` | 🔒 [admin, author] | Create a new post |
| GET | `/api/posts/:id` | Public | Get a single post |
| PATCH | `/api/posts/:id` | 🔒 [admin, author] | Update a post |
| DELETE | `/api/posts/:id` | 🔒 [admin, author] | Delete a post |

```json
// POST /api/posts
{
  "title": "My First Blog Post",
  "content": "This is the content of the post."
}
```

---

### ❤️ Likes — `/api/posts`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/posts/:id/like` | 🔒 Protected | Like a post |
| DELETE | `/api/posts/:id/like` | 🔒 Protected | Unlike a post |
| GET | `/api/posts/:id/likes` | Public | Get all likes for a post |

---

### 🔖 Bookmarks — `/api/posts` & `/api/users`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/posts/:id/bookmark` | 🔒 Protected | Bookmark a post |
| DELETE | `/api/posts/:id/bookmark` | 🔒 Protected | Remove a bookmark |
| GET | `/api/users/me/bookmarks` | 🔒 Protected | Get current user's bookmarks |

---

### 💬 Comments — `/api/comments`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/comments/:postId` | 🔒 Protected | Add a comment to a post |
| DELETE | `/api/comments/:id` | 🔒 Protected | Delete a comment |
| GET | `/api/comments/post/:postId` | Public | Get all comments for a post |

```json
// POST /api/comments/:postId
{
  "content": "Great post!"
}
```

---

### 🧪 Test — `/api/test`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/test/me` | 🔒 Protected | Returns current logged-in user |
| GET | `/api/test/admin-only` | 🔒 [admin] | Admin-only test route |

---

## 🛡 Role-Based Access Control (RBAC)

The system supports three roles assigned at registration:

| Role | Description |
|---|---|
| `user` | Can comment on, like, and bookmark posts |
| `author` | Can do everything a user can, plus create, update and delete posts |
| `admin` | Full access to all features and routes |

| Feature | User | Author | Admin |
|---|---|---|---|
| Register / Login | ✅ | ✅ | ✅ |
| View Posts & Comments | ✅ | ✅ | ✅ |
| Like / Unlike Posts | ✅ | ✅ | ✅ |
| Bookmark Posts | ✅ | ✅ | ✅ |
| Add / Delete Comments | ✅ | ✅ | ✅ |
| Create / Edit / Delete Posts | ❌ | ✅ | ✅ |
| Access Admin-only Routes | ❌ | ❌ | ✅ |

---

## 🔐 Authentication Flow

1. Register via `POST /api/auth/register`
2. Login via `POST /api/auth/login` — JWT is set as an **HTTP-only cookie** automatically
3. All protected requests send the cookie automatically
4. Role is validated per route via `role.middleware.js`

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request


---

> Built with 💙 for modern blog platform development