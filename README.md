# 🌟 Personal Blog System

A modern, full-stack personal blog and portfolio system built with cutting-edge technologies. Designed with a sleek, responsive user interface and a robust, secure backend.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion, React Three Fiber (3D effects)
- **Routing**: React Router DOM v6
- **Markdown**: React Markdown, UIW React MD Editor

### Backend
- **Framework**: Spring Boot 3.2.4
- **Language**: Java 17
- **Database**: MySQL 8.0+
- **ORM**: MyBatis-Plus 3.5.5
- **Security**: Spring Security + JWT Authentication
- **API Docs**: SpringDoc OpenAPI (Swagger 3)

---

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1. Database Setup
1. Install MySQL 8.0+ and start the MySQL service.
2. Create a new database named `blog`:
   ```sql
   CREATE DATABASE blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Import the provided SQL structure:
   ```bash
   mysql -u root -p blog < database.sql
   ```
*(Note: There is also a `database.db` SQLite file locally, but the Spring application connects to MySQL by default).*

### 2. Backend Configuration
For security, the backend relies on environment variables for database credentials rather than hardcoding them. You must set these variables before running the application.

- **`DB_HOST`**: Database host (default: `localhost`)
- **`DB_USERNAME`**: MySQL username (e.g., `root`)
- **`DB_PASSWORD`**: MySQL password
- **`JWT_SECRET`**: (Optional) Custom secret key for signing JWT tokens.

**Running locally (Dev profile):**
```bash
cd server
# Ensure you are using Java 17
mvn clean compile

# Pass the environment variables when starting Spring Boot:
DB_USERNAME=root DB_PASSWORD=your_password mvn spring-boot:run
```
*(The server will start on `http://localhost:8080`)*

### 3. Frontend Configuration
The frontend project is located in the root directory.

```bash
# Important: Requires Node.js (v18+)
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev
```
The local frontend dev server will typically start on `http://localhost:5173`. API requests are automatically proxied to the backend on port `8080`.

---

## 🏗️ Project Structure

```text
├── src/                  # Frontend source code (React)
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page Views (Front & Admin)
│   ├── router/           # React Router configurations
│   ├── utils/            # Utility functions and API helpers
│   └── index.css         # Global Tailwind styles
├── server/               # Backend source code (Spring Boot)
│   ├── src/main/java     # Java source code
│   └── src/main/resources# Application configurations (application.yml)
├── database.sql          # Database initialization script
├── README.md             # This readme file
└── package.json          # Frontend dependencies
```

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
