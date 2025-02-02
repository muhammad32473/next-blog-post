# Blog Application with GraphQL

This is a simple blog application built with Next.js for the frontend and Apollo Server with GraphQL for the backend. The app allows users to view posts, read individual posts, and create new posts.

## Features

- **Frontend**: Built with Next.js and styled with Tailwind CSS.
- **Backend**: GraphQL API powered by Apollo Server.
- **Database**: MySQL for persistent storage.
- **Dynamic Routes**: Navigate to individual posts via dynamic routes.
- **GraphQL Queries/Mutations**: Fetch and manipulate data with GraphQL.

## Installation and Setup

Follow these steps to run the project locally:

### Prerequisites

- **Node.js**: Download and install.
- **MySQL**: Download and install.
- **Git**: Download and install.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/next-blog-app.git
cd next-blog-post
```

### 2. Install dependencies

#### Frontend:
```bash
cd next-frontend
npm install
```

#### Backend:
```bash
cd graphql-backend
npm install
```

### 3. Create `.env` files

#### Frontend `.env`
Create a `.env` file in the frontend directory with the following content:
```env
GRAPHQL_API=http://localhost:4000/graphql
```

#### Backend `.env`
Create a `.env` file in the backend directory with the following content:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=blog_app
```
Replace `your_mysql_username` and `your_mysql_password` with your MySQL credentials.

### 4. Set up the database

Open your MySQL client (e.g., MySQL Workbench or command line) and create a database:
```sql
CREATE DATABASE blog_app;
```

Use the following schema to create a `posts` table:
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

### 5. Start the application

#### Backend:
```bash
cd graphql-backend
npx tsc
node dist/server.js
```

#### Frontend:
```bash
cd next-frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend GraphQL server will be running at `http://localhost:4000/graphql`.

## Usage

- Navigate to `http://localhost:3000` to view the blog posts.
- Click on a post to view its details.
- Add new posts via the GraphQL playground at `http://localhost:4000/graphql`. (Mutation examples can be added as needed.)

## Well-Documented Code

The project contains meaningful comments in both frontend and backend code to ensure clarity. Developers can easily understand the purpose of each function and component.

## Project Structure

### Frontend
```
/next-frontend/
├── APOLLO/                  # Apollo-related files for GraphQL
│   ├── apollo-client.ts     # Apollo Client setup to fetch posts by ID
│   ├── apollo-queries.ts    # GraphQL queries
│   └── fetch-posts.ts       # Function to fetch posts using GraphQL client
├── app/                     # Next.js app directory
│   ├── create-post/         # Page to create new posts
│   │   └── page.tsx         # Create post form
│   ├── post/                # Dynamic routing for individual posts
│   │   └── [postId]/        # Dynamic route folder
│   │       └── page.tsx     # Fetch post by ID
│   ├── favicon.ico          # Favicon for the application
│   ├── globals.css          # Global CSS styles
│   ├── layout.tsx           # Default layout component
│   ├── not-found.tsx        # Page displayed for not found routes
│   └── page.tsx             # Default homepage with pagination
├── components/              # Reusable React components
│   ├── Header.tsx           # Header component
│   ├── PostCard.tsx         # Component to display individual posts
├── public/                  # Static assets (images/icons)
├── .env                     # Environment variables (contains backend address, not included in version control)
├── .gitignore               # Git ignore file
├── eslint.config.mjs        # ESLint configuration file
├── next-env.d.ts            # Next.js environment type declarations
├── next.config.ts           # Next.js configuration file
├── package-lock.json        # Ensures consistent dependency versions
├── package.json             # Project dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration file
├── README.md                # Documentation for the project
├── tailwind.config.ts       # Tailwind CSS configuration file
└── tsconfig.json            # TypeScript configuration file
```

### Backend
```
/graphql-backend/
├── src/                    # TypeScript source files
│   ├── db.ts               # Database connection and configuration
│   ├── resolvers.ts        # GraphQL resolvers
│   ├── schema.ts           # GraphQL type definitions and schema
│   └── server.ts           # Main server file
├── .env                    # Environment variables (ignored by Git)
├── .gitignore              # Git ignore file
├── package-lock.json       # Ensures consistent dependency versions
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Contribution

Feel free to fork the repository and submit pull requests. For major changes, open an issue first to discuss the proposed changes.

## License

This project is licensed under the MIT License.

