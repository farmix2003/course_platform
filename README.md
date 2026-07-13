# CourseHub - Online Course Platform

CourseHub is a full-stack online course platform with authentication, a public course catalog, course details, and an admin dashboard for managing courses. The project uses a React frontend, a Spring Boot REST API, PostgreSQL, JWT authentication, and optional Telegram notifications.

## Features

- User registration and login
- JWT-based authentication
- Role-based authorization (`USER` and `ADMIN`)
- Responsive landing page
- Courses loaded from the backend API
- Course list and course details pages
- Admin dashboard
- Create, update, and delete courses
- Telegram notifications for new users and courses
- Consistent backend error responses
- Field-level frontend validation
- Automatic expired-session handling
- Swagger/OpenAPI documentation

## Technology stack

### Frontend

- React 19 and TypeScript
- Vite
- Material UI
- React Router
- TanStack Query
- Axios
- React Hook Form and Zod

### Backend

- Java 17+
- Spring Boot 4
- Spring Security
- Spring Data JPA and Hibernate
- PostgreSQL
- JSON Web Tokens (JJWT)
- Bean Validation
- Springdoc OpenAPI

## Project structure

```text
course_platform/
|-- backend/     # Spring Boot REST API
|-- frontend/    # React application
`-- README.md
```

## Prerequisites

Install the following tools:

- Java 17 or newer
- Maven 3.9+ (or use the included Maven Wrapper)
- Node.js 20+
- npm
- PostgreSQL

## Database setup

Create a PostgreSQL database:

```sql
CREATE DATABASE course_platform_db;
```

Hibernate creates and updates the required tables automatically when the backend starts.

## Backend configuration

The backend reads configuration from environment variables. PowerShell examples are shown below.

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/course_platform_db"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your_database_password"
$env:JWT_SECRET="your_base64url_encoded_256_bit_secret"
$env:JWT_EXPIRATION_MS="3600000"
```

`JWT_SECRET` must be a Base64URL-encoded key containing at least 256 bits of random data. Generate one with OpenSSL:

```bash
openssl rand -base64 32 | tr '+/' '-_' | tr -d '='
```

### Telegram integration

Telegram integration is optional and disabled by default. To enable it:

```powershell
$env:TELEGRAM_BOT_ENABLED="true"
$env:TELEGRAM_BOT_TOKEN="your_bot_token"
$env:TELEGRAM_CHAT_ID="your_chat_id"
```

When enabled, the backend sends notifications when a user registers or a course is created. If Telegram is unavailable, the main operation continues and the failure is logged.

## Run the backend

From the project root:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

If Maven is installed globally:

```powershell
mvn spring-boot:run
```

The API runs at `http://localhost:8080`.

Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

## Frontend configuration

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

## Run the frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Create an administrator

Registration creates regular `USER` accounts. After registering the initial account, promote it in PostgreSQL:

```sql
UPDATE users
SET user_role = 'ADMIN'
WHERE email = 'admin@example.com';
```

Log out and log in again so the new role is included in the frontend session. Administrators can access `/admin/courses` and manage courses.

## API endpoints

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a user and return a JWT |
| `POST` | `/api/auth/login` | Public | Authenticate and return a JWT |

### Courses

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/courses` | Public | List courses |
| `GET` | `/api/v1/courses/{id}` | Public | Get course details |
| `POST` | `/api/v1/courses` | Admin | Create a course |
| `PUT` | `/api/v1/courses/{id}` | Admin | Update a course |
| `DELETE` | `/api/v1/courses/{id}` | Admin | Delete a course |

Protected requests use the following header:

```http
Authorization: Bearer <access-token>
```

## Error response format

The API returns consistent JSON errors:

```json
{
  "timestamp": "2026-07-13T10:00:00Z",
  "status": 400,
  "error": "Validation Failed",
  "message": "Request validation failed",
  "path": "/api/auth/register",
  "fieldErrors": {
    "email": "Email format is invalid",
    "password": "Password must contain at least 8 characters"
  }
}
```

The frontend displays API messages, maps validation errors to form fields, and clears expired sessions after protected requests return `401`.

## Tests and quality checks

Backend tests:

```powershell
cd backend
.\mvnw.cmd test
```

Frontend lint:

```powershell
cd frontend
npm run lint
```

Frontend production build:

```powershell
npm run build
```

## Security notes

- Do not commit production database passwords, JWT secrets, or Telegram tokens.
- Use environment variables in deployed environments.
- Replace all development defaults before deployment.
- Use a long, random Base64URL JWT signing key.
- Serve the deployed application over HTTPS.
- Restrict CORS origins to the deployed frontend address.

## Main application routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Login page |
| `/register` | Registration page |
| `/courses` | Course catalog |
| `/courses/:id` | Course details |
| `/admin/courses` | Admin course dashboard |

##Example Admin credentials

-email: admin@gmail.com
-password: password123

## License

This project was created as a technical assignment and learning project.

