# 📝 Blog Backend API

A production-style Backend-First Blog API built with Node.js, Express, and MongoDB.
This project focuses on authentication, role-based authorization, ownership control, and content visibility rules — not just CRUD.

🚀 Features:-

🔐 Authentication-
User registration & login
Password hashing (bcrypt)
JWT-based authentication
Protected routes using middleware

🛡️ Authorization (Role-Based Access)-
Three roles:
Admin
Author
Reader

Role permissions are enforced at middleware and controller level.

| Action                      | Reader | Author  | Admin |
| --------------------------- | ------ | ------- | ----- |
| Register/Login              | ✅      | ✅       | ✅     |
| Create Post                 | ❌      | ✅       | ✅     |
| Edit Own Post               | ❌      | ✅       | ✅     |
| Edit Any Post               | ❌      | ❌       | ✅     |
| Delete Own Post             | ❌      | ✅       | ✅     |
| Delete Any Post             | ❌      | ❌       | ✅     |
| Comment on Published Post   | ✅      | ✅       | ✅     |
| Comment on Draft            | ❌      | ✅ (own) | ✅     |
| Delete Own Comment          | ✅      | ✅       | ✅     |
| Delete Any Comment          | ❌      | ❌       | ✅     |
| Delete Comments on Own Post | ❌      | ✅       | ✅     |


🏗️ Tech Stack-
Node.js
Express.js
MongoDB + Mongoose
JWT (jsonwebtoken)
bcryptjs

