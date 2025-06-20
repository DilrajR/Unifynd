# 🌐 Unifynd

**A platform for TMU students to connect, post ads, and communicate about items wanted, items for sale, and academic services.**

---

## 🎯 Project Goal
**Unifynd** aims to create a seamless, user-friendly online marketplace exclusively for TMU students. It allows students to:

- Post ads for items wanted, for sale, or for academic services.
- Filter listings by category, price, location, or keywords.
- Message other students and manage their own posts.

---

## 📋 Features

### 🔐 Account Creation & Login
- New users can **register** an account and **log in** securely.
- Passwords are stored securely in **MongoDB**.
- Authentication is handled by verifying the username and password stored in the database.

### 🏠 Home Page
- Displays a feed of all user posts.
- Enables filtering by:
  - Category (`Wanted`, `Sale`, `Academic Service`)
  - Price range
  - Location
  - Keyword search
- Provides access to direct messaging between students.

### 🗣️ Messaging
- Enables direct conversations between students.
- Shows recent chats and allows viewing full conversations, including timestamps.

### ➕ Add Post Page
- Enables users to create new posts.
- Requires:
  - **Title**
  - **Description**
  - **Location**
  - **Price**
  - **Category**
  - **Image**
- Images are stored in **Firebase** (no user authentication), making it easy to host and display media.

### 👤 Profile Page
- Displays a user’s own posts.
- Provides **delete post** feature (trash icon).
- Enables filtering within a user’s posts for seamless experience.

### 📥 Inbox Page
- Shows all received and sent messages.
- Enables opening chat threads and viewing conversation history, including timestamps.

### 🛠️ Admin Page
- Admin accounts have special privileges:
  - Delete any post.
  - Delete any user and their associated posts.
- Provides a search bar for quick user searches.

### 🔓 Logout Page
- Enables user to securely sign out.
- Redirects to the **Login** page upon sign out.

---

## 📱 Navbar
- Provides seamless navigation across pages.
- Responsive design:
  - Displays links on larger screens.
  - Shows a dropdown menu on smaller screens.

---

## ⚡️ Technologies & Tools
- **Frameworks**: ReactJS (frontend), Node.js (backend), Express
- **Database**: MongoDB (user data, posts, messages), Firebase (image storage)
- **Authentication**: User sign-in handled via **MongoDB**
- **Additional Tools**:
  - RESTful APIs
  - Responsive design
  - Version control with Git

---

## 👥 Acknowledgements
Developed as a collaborative project for TMU students, making online student interactions safe, convenient, and productive.
