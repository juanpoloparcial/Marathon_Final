Backend for Marathon_Final (Express + MongoDB)

Quick start

1) Environment file
- Copy `backend/.env.example` to `backend/.env` and adjust values.
- Ensure `MONGODB_URI` points to a running MongoDB instance (local or cloud).

2) Install and run (from project root)

Windows PowerShell

```
npm --prefix backend install
npm --prefix backend run dev
```

API runs on http://localhost:4000

Project structure (backend)
- `backend/src/index.js`: Express app entrypoint
- `backend/src/db/mongo.js`: MongoDB connection via Mongoose
- `backend/src/models/*`: Mongoose models (User, Event, Enrollment)
- `backend/src/routes/*`: Auth, Events, Users routes
- `backend/src/middleware/*`: Auth and role guards
- `backend/src/utils/jwt.js`: JWT helpers

Endpoints
- POST /api/auth/register { nombre, apellido, email, contrasenia }
- POST /api/auth/login { email, password }
- GET /api/auth/me (Bearer token)
- GET /api/events
- POST /api/events (admin/superadmin)
- PUT /api/events/:id (admin/superadmin)
- DELETE /api/events/:id (admin/superadmin)
- POST /api/events/:eventId/enroll (auth)
- DELETE /api/events/:eventId/enroll (auth)
- GET /api/users (superadmin)
- PATCH /api/users/:id/role { role } (superadmin)
- DELETE /api/users/:id (superadmin)

Frontend config
- Create `frontend/.env.local` with:
   `NEXT_PUBLIC_API_URL=http://localhost:4000`

Notes
- CORS allows http://localhost:3000 by default. Change `CORS_ORIGIN` in `backend/.env` if needed.
- There is a single backend at `backend/`. Any older nested `backend/backend` folder has been removed.
