README.md# Next.js Blog Application with GraphQL

This is a simple blog application built with Next.js for the frontend and Apollo Server with GraphQL for the backend. The app allows users to view posts, read individual posts, and create new posts.

## Features
- **Frontend**: Built with Next.js and styled with Tailwind CSS.
- **Backend**: GraphQL API powered by Apollo Server.
- **Database**: MySQL for persistent storage.
- **Dynamic Routes**: Navigate to individual posts via dynamic routes.
- **GraphQL Queries/Mutations**: Fetch and manipulate data with GraphQL.

---

## Installation and Setup

Follow these steps to run the project locally:

### Prerequisites
- **Node.js**: [Download and install](https://nodejs.org/)
- **MySQL**: [Download and install](https://dev.mysql.com/downloads/)
- **Git**: [Download and install](https://git-scm.com/)

---

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/next-blog-app.git
cd next-blog-app
```

---

### 2. Install dependencies

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd backend
npm install
```

---

### 3. Create `.env` files

#### Frontend `.env`
Create a `.env` file in the `frontend` directory with the following content:
```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

#### Backend `.env`
Create a `.env` file in the `backend` directory with the following content:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=blog_app
```
Replace `your_mysql_username` and `your_mysql_password` with your MySQL credentials.

---

### 4. Set up the database

1. Open your MySQL client (e.g., MySQL Workbench or command line).
2. Create a database:
   ```sql
   CREATE DATABASE blog_app;
   ```
3. Use the following schema to create a `posts` table:
   ```sql
   USE blog_app;
   CREATE TABLE posts (
       id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
       author VARCHAR(255) NOT NULL,
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       postedAt TEXT NOT NULL
   );
   ```

---

### 5. Start the application

#### Backend:
```bash
cd backend
npm start
```

#### Frontend:
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend GraphQL server will be running at `http://localhost:4000/graphql`.

---

## Usage
- Navigate to `http://localhost:3000` to view the blog posts.
- Click on a post to view its details.
- Add new posts via the GraphQL playground at `http://localhost:4000/graphql` (mutation examples can be added as needed).

---

## Well-Documented Code
The project contains meaningful comments in both frontend and backend code to ensure clarity. Developers can easily understand the purpose of each function and component.

---

## Contribution
Feel free to fork the repository and submit pull requests. For major changes, open an issue first to discuss the proposed changes.

---

## License
This project is licensed under the MIT License.
