# 🚀 SpeakVerse – A Full-Stack Blogging Platform

**SpeakVerse** is a modern, feature-rich full-stack blogging platform built using the **MERN stack**. It empowers users to create, manage, and engage with blogs in a seamless, responsive UI, while offering powerful admin capabilities for moderation and platform oversight. With real-time interactions, rich-text editing, role-based access control, and cloud integrations, SpeakVerse delivers a complete blogging experience.

---

## 📁 Project Structure

```
SpeakVerse/
├── Backend/
│ ├── config/ # DB & environment configuration
│ ├── controllers/ # Request logic for each route
│ ├── helpers/ # Utility/helper functions
│ ├── middlewares/ # Auth, error handling middlewares
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Route definitions (auth, blog, comment, etc.)
│ ├── server.js # Entry point for the Express server
│ └── package.json # Backend dependencies
│
├── Frontend/
│ ├── public/ # Static assets
│ ├── src/ # React source code
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Route-based pages
│ │ ├── redux/ # Redux Toolkit slices and store
│ │ └── App.jsx # Main app component
│ ├── tailwind.config.js
│ ├── vite.config.js
│ └── package.json # Frontend dependencies

```

## 📌 Features

### 👤 Normal Users
- 📝 Create and publish blogs using **CKEditor 5** (rich text editor)
- 👍 Like / 👎 Unlike any blog
- 💬 Comment on their own or others' blogs
- 🛠 Manage personal blogs (Edit/Delete)
- 🧾 View and manage personal comments
- 🧾 Moderate comments on own blogs
- 👤 Update profile information
- 🔔 Receive real-time notifications for likes and comments

### 🛡 Admin Panel
- 📄 View and delete **any blog**
- 💬 View and delete **any comment**
- 🗂 Add, edit, and manage blog **categories**
- 👥 View all users and **delete** any user
- 👤 Update admin profile
- 📊 View real-time **analytics** for likes and comments

### 🌍 Public Access
- 🌐 View all published blogs
- 📖 Read full blog content with formatted rich text
- 🧩 Explore related blogs based on **category** or **tags**
- 🔍 Search blogs by **title** or **category**

### 💌 Email Notifications
- ✉️ Email sent to the blog author when someone likes or comments on their post
- ✉️ Welcome email sent upon successful registration

---

## 🛠 Tech Stack

| Layer         | Technologies                                                                 |
|---------------|------------------------------------------------------------------------------|
| **Frontend**  | React.js, Tailwind CSS, Shadcn/ui, Redux Toolkit, Firebase (Google Auth)     |
| **Backend**   | Node.js, Express.js, MongoDB Atlas, JWT, Zod, Cloudinary, CKEditor 5         |
| **State Mgmt**| Redux Toolkit                                                                |
| **Auth**      | Firebase (Google OAuth), JWT with Zod Validation                             |
| **Editor**    | CKEditor 5                                                                   |
| **Media**     | Cloudinary                                                                   |
| **Database**  | MongoDB Atlas with Mongoose                                                  |

---

## 🔐 Authentication & Authorization

- 🔒 **JWT** tokens stored in **HTTP-only cookies** using `cookie-parser`
- ✅ **Input validation** using **Zod**
- 🚫 **Protected Routes:**
  - `/admin` → Admin-only
  - `/dashboard`, `/my-blogs`, etc. → Authenticated users only
- 🧱 **Custom Middlewares:**
  - `Authenticate` – Verifies and attaches user info to the request
  - `AdminView` – Grants admin-only access

---

## 🧩 Additional Highlights

- 🧠 Related Blogs section for exploring similar content
- 🔁 Real-time like and comment counters
- 📄 Rich blog formatting with media support (via CKEditor)
- 📷 Image uploads handled securely using **Cloudinary**
- 📬 Secure Google Authentication using Firebase

---

## 📦 Installation & Setup

```bash
# 1. Clone the repo
https://github.com/Sunilsahoo96/Speak-Verse.git
cd frontend

# 2. Install dependencies
npm install

# 3. Setup environment variables
# (Create .env file in root with required variables)

# 4. Run the app
npm start

https://github.com/Sunilsahoo96/Speak-Verse.git
cd backend

# 2. Install dependencies
npm install

# 3. Setup environment variables
# (Create .env file in root with required variables)

# 4. Run the app
npm run dev





