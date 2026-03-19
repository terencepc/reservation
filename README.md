# 🍽️ Reservation API

A backend REST API for managing restaurant table reservations, with full functional and performance test coverage.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + Express |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |
| Functional Tests | Karate (JUnit5 via Maven) |
| Performance Tests | k6 (TypeScript) |
| Reporting | Allure + Karate HTML |
| CI/CD | GitHub Actions |

---

## Project Structure

```
reservation/
├── reservation-backend/
│   ├── src/
│   │   ├── app.js           # Express app setup, route mounting
│   │   ├── server.js        # Entry point, starts server on port 3000
│   │   ├── admin.js         # Auth routes + JWT middleware
│   │   ├── tables.js        # Tables CRUD routes
│   │   └── prisma.js        # Prisma client instance
│   ├── prisma/
│   │   ├── schema.prisma    # DB models: Admin, Table
│   │   ├── seed.js          # Seeds default admin user
│   │   └── migrations/      # Prisma migration history
│   └── package.json

reservation-api-tests/
├── src/
│   ├── config/base.ts       # BASE_URL + default headers
│   ├── services/
│   │   └── authService.ts   # HTTP call to POST /api/admin/login
│   ├── scenarios/
│   │   └── login.ts         # k6 scenario: login + checks
│   └── tests/
│       └── login.test.ts    # k6 entry: options (VUs, duration, thresholds)
├── src/test/
│   ├── java/TestRunner.java          # JUnit5 Karate runner
│   └── resources/
│       ├── karate-config.js          # baseUrl config
│       └── features/
│           ├── login.feature         # Login API scenarios
│           └── tables.feature        # Tables API scenarios
├── pom.xml                           # Maven + Karate + Allure deps
├── tsconfig.json                     # TypeScript config for k6
└── .github/workflows/main.yml        # CI pipeline
```

---

## Backend Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 15+

### Installation

```bash
cd reservation-backend
npm install
```

### Environment Variables

Create a `.env` file in `reservation-backend/`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/reservation_dev
JWT_SECRET=your_secret_key_here
```

### Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Seed the default admin user
npx prisma db seed

# (Optional) View DB in Prisma Studio
npx prisma studio
```

### Start the Server

```bash
npm start
# Server running at http://localhost:3000
```

---

## API Reference

### Auth

#### `POST /api/admin/login`

Authenticates an admin and returns a JWT token.

**Request Body**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response `200`**
```json
{
  "token": "<jwt_token>"
}
```

**Response `401`**
```json
{
  "message": "Invalid credentials"
}
```

---

### Tables

#### `GET /api/tables`

Returns all tables. No authentication required.

**Response `200`**
```json
[
  { "id": 1, "tableNumber": 1, "seats": 4 },
  { "id": 2, "tableNumber": 2, "seats": 2 }
]
```

#### `POST /api/tables` 🔒 *Admin only*

Creates a new table. Requires `Authorization: Bearer <token>` header.

**Request Body**
```json
{
  "tableNumber": 3,
  "seats": 6
}
```

**Response `200`**
```json
{
  "id": 3,
  "tableNumber": 3,
  "seats": 6
}
```

**Response `401`** — missing or invalid token
```json
{
  "message": "No token provided"
}
```

---

## Running Tests

### Karate (Functional Tests)

> Requires Java 17 and Maven

```bash
cd reservation-api-tests

# Run all feature files
mvn test

# View Karate HTML report
open target/karate-reports/karate-summary.html

# Generate Allure report
mvn allure:serve
```

#### Feature Coverage

| Feature | Scenarios |
|---|---|
| `login.feature` | ✅ Successful login (200 + token) |
| | ✅ Invalid password (401) |
| `tables.feature` | ✅ Get all tables (authenticated GET) |

### k6 (Performance Tests)

> Requires k6 and Node.js

```bash
cd reservation-api-tests

# Install dependencies
npm install

# Compile TypeScript
npx tsc -p tsconfig.json

# Run performance test
k6 run dist/tests/login.test.js

# Run against a specific environment
BASE_URL=https://your-api.com k6 run dist/tests/login.test.js
```

#### k6 Configuration

| Setting | Value |
|---|---|
| Virtual Users | 100 |
| Duration | 1 minute |
| p(95) response time | < 6000ms |
| Error rate | < 1% |

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/main.yml`) runs on every push and PR to `main`.

**Pipeline Steps:**

1. Spin up PostgreSQL 15 service container
2. Checkout test repo + backend repo
3. Install backend dependencies
4. Run Prisma migrations + seed
5. Start backend server, wait for health check
6. Run Karate tests (`mvn test`)
7. Install k6, compile TypeScript, run performance tests

**Environment Variables used in CI:**

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/reservation_test
JWT_SECRET=mysupersecretkey
BASE_URL=http://localhost:3000
NODE_ENV=test
```

---

## Database Schema

```prisma
model Admin {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String  // bcrypt hashed
}

model Table {
  id          Int @id @default(autoincrement())
  tableNumber Int @unique
  seats       Int
}
```

---

## Default Credentials

Seeded by `prisma/seed.js`:

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

> ⚠️ Change these credentials before deploying to any non-local environment.