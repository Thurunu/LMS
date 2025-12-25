# Student Registration & Course Enrollment System — Quick Start

This quick start guide helps you run the frontend, backend, and database locally (or via Docker).

## Technology Stack

- **Frontend:** React, Vite, React Router, Axios, Tailwind CSS
- **Backend:** Spring Boot 3.5.8, Spring Security, Spring Data JPA, Hibernate
- **Auth:** JWT (JSON Web Tokens)
- **Database:** Microsoft SQL Server Express

## Prerequisites

- Node.js (v16+ recommended)
- Java 17+ and Maven (for the backend)
- Docker & Docker Compose (optional, recommended for easy setup)
- Microsoft SQL Server (if not using Docker)

## Running with Docker

Start all services with Docker Compose if you prefer a containerized setup:

```powershell
docker-compose up
```

This will start the backend, frontend (if included), and the database according to `docker-compose.yml`.

## Frontend (local)

1. Open a terminal and change into the frontend folder:

```powershell
cd knowledgePulseFrontend
```

2. Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

The frontend will typically be available at `http://localhost:5173` (Vite default). Check the terminal output for the exact URL.

## Backend (local)

1. Change into the backend folder:

```powershell
cd knowledgePulseBackend
```

2. Build and run the Spring Boot application:

```powershell
mvn clean install
mvn spring-boot:run
```

The backend runs on `http://localhost:8080` by default.

## Database

- If you run SQL Server locally, make sure the server is running (default port `1433`).
- Create the database used by the application (example SQL command):

```sql
CREATE DATABASE knowledgePulseDB;
```

Adjust your backend `application.properties` / `application.yml` to point to the correct JDBC URL, username, and password.

## First use

1. Once backend and frontend are running, open the frontend in the browser and sign in with the default admin account:

```
username: admin@admin.com
password: admin123
```

2. From the Admin Dashboard you can create courses (course code, name, instructor, credits, description).
3. Students can then register and enroll in those courses.

## Useful Endpoints / URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080` (API base: `/api`)

## Troubleshooting

- If the frontend cannot reach the backend, confirm CORS settings and that the backend is listening on `localhost:8080`.
- If image or static assets fail to load, check the asset base path and whether the backend is serving protected files.
- If using Docker, check container logs:

```powershell
docker-compose logs -f
```
---
