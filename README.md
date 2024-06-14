# Troov Web App

This project is a full-stack web application that includes both frontend and backend components. The backend is built with Node.js, Express, and MongoDB, while the frontend uses Nuxt.js. The application is containerized using Docker, and Docker Compose is used for orchestration.

## Project Structure

```plaintext
troov-web-app/
├── nuxt-app/
├── server/
├── docker/
│      │── server.develop.Dockerfile
│      └── nuxt-app.develop.Dockerfile
├── .gitignore
├── docker-compose.develop.yaml
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Docker
- Docker Compose
- pnpm

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kinaneb/troov-web-app.git
cd my-web-app
```

### 2. Set Up Environment Variables

Create a .env file in the server directory and add the following environment variables:

```plaintext
# server/.env
PORT=3000
```

### 3. Run the Application with Docker Compose

Ensure you are in the root directory of the project and run:

```bash
docker-compose -f docker-compose.develop.yaml up --build
```

This command will build and start both the backend and frontend services.

- The backend will be available at http://localhost:3000.
- The frontend will be available at http://localhost:3001.

### 4. Accessing the Application

- Navigate to http://localhost:3001 to access the frontend.
  - Use API endpoints from http://localhost:3000 for backend services.

### Backend (server/)

- controllers/ - Contains handlers logic.
- models/ - Contains Mongoose models.
- services/ - Contains business logic.
- utils/ - Contains utility functions.
- index.js - Entry point for the backend server.

### Frontend (nuxt-app):
- /: Displays a list of objects with basic details.
- /register: New users can create an account.
- /login: Allows users to log in with their credentials.
- /add-object: Form to add a new object to the system.

- .env - Environment variables file.
