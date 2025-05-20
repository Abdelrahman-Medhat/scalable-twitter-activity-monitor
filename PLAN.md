Here's a polished and **well-structured project documentation** based on your original plan. It's organized for clarity, scalability, and collaboration — great for onboarding team members or revisiting your project later.

---

# 📦 Project Plan: Web Application with Dockerized Backend & Frontend

## 🔧 Architecture Overview

This project is a **simple yet scalable web application** composed of two primary Docker containers:

* **Backend:** Node.js + TypeScript + PostgreSQL + Redis (via BullMQ)
* **Frontend:** React + TypeScript

All services are orchestrated using **Docker Compose**, including shared services like PostgreSQL and Redis.

---

## 🧠 Backend (Node.js + TypeScript)

### 📌 Description

* Written in **TypeScript**, ensuring full static typing.
* Follows a clean **OOP service-based architecture**.
* Uses **PostgreSQL** as the database (same container network).
* Uses **Redis** and **BullMQ** for queue processing and inactivity checks.
* Integrated with **Prisma ORM**.

### 📋 Requirements

#### 1. PostgreSQL

* Included as a container in the main `docker-compose.yml`.
* Shared across backend and frontend projects (accessed via network).
* Managed using **Prisma ORM** for schema/migrations.

#### 2. OOP Twitter Service

Encapsulates all core business logic:

* Handles profile activities: tweet, retweet, reply.
* Exposes a class with methods to update activity state and compute active/inactive status.

#### 3. REST API Endpoints

Each endpoint delegates business logic to the Twitter service class.

| Method | Endpoint    | Description                                                                               |
| ------ | ----------- | ----------------------------------------------------------------------------------------- |
| POST   | `/activity` | Log an activity (`TWEET`, `RETWEET`, `REPLY`) for a profile.                              |
| GET    | `/profiles` | Returns list of profiles with activity count, active status, and last activity timestamp. |
| GET    | `/alerts`   | Returns profiles that have been **inactive for more than 30 minutes**.                    |

**Sample Request/Response for `/activity`:**

```json
POST /activity
{
  "handle": "elonmusk",
  "type": "TWEET",
  "timestamp": "2025-05-15T09:00:00Z" // Optional, defaults to now()
}
```

---

#### 4. Redis (with BullMQ)

* Shared Redis container from the main `docker-compose.yml`.
* BullMQ is used to manage inactivity detection tasks.

#### 5. OOP Queue Service (BullMQ)

* Periodically checks all profiles for activity.
* If `last_activity <= now() - 30 minutes`, mark profile as inactive (`active = 0`).
* Otherwise, set `active = 1`.
* Justification for BullMQ:

  * Scalable to distributed task processing.
  * Built-in retry logic and concurrency support.
  * Better than relying on centralized cron jobs in large-scale environments.

---

### ✅ Best Practices & Enforcements

* **Validation:** All request schemas are defined using `zod` in a dedicated validation file. Errors are raised as `ValidationError` and handled centrally.
* **Types:** All types/interfaces are defined in centralized TypeScript files.
* **Error Handling:** Dedicated error classes and exception handlers.
* **Separation of Concerns:** OOP services handle business logic separately from the API layer.
* **Testing:** Unit tests must be implemented for all services and endpoints.
* **ORM:** Uses **Prisma** for database modeling, migrations, and querying.

---

## 💻 Frontend (React + TypeScript)

### 📌 Description

* Written in **React with TypeScript**, fully typed.
* Communicates with the backend through defined APIs.
* Uses **Prisma** in cases where direct DB access is needed (admin-like tooling or statically rendered content).

### ✅ Frontend Rules & Requirements

* **Validation:** Must use `zod` for all schema validation (no custom logic).
* **Error Handling:** Centralized and typed error boundaries.
* **Typed Data Models:** All types shared across backend and frontend where applicable (e.g., using a shared `@types` package or schema generator).
* **Exception Handling:** Separate module for handling all exceptions.
* **Service Layer:** All external API calls should be abstracted into OOP-style services.
* **Testing:** Unit testing using **Jest** or **Vitest**.
* **Prisma:** For SSR or admin access where needed.

---

## 🐳 Docker Setup Summary

### Services in `docker-compose.yml`:

* **PostgreSQL:** Shared database container.
* **Redis:** Required for BullMQ queue processing.
* **Backend:** Node.js API server.
* **Frontend:** React app server (e.g., Vite or Next.js).

---

## 📂 Suggested Folder Structure

```bash
/backend
  /src
    /services
      TwitterService.ts
      QueueService.ts
    /routes
    /schemas  # zod validation
    /types
    /exceptions
    /jobs
  prisma/
  Dockerfile
/frontend
  /src
    /services
    /components
    /types
    /validators
    /exceptions
  Dockerfile
/docker-compose.yml
```

---

Let me know if you'd like help:

* Generating the `docker-compose.yml`
* Setting up BullMQ with Redis
* Writing base OOP service files or Prisma schema

I can scaffold those for you if needed.
