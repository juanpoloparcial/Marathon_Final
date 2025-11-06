Backend for Marathon_Final (Express)

Quick start

1. Create env file
   - Copy backend/.env.example to backend/.env and adjust values.

2. Install and run (from project root)

   Windows PowerShell
   
   npm --prefix backend install
   npm --prefix backend run dev

   API runs on http://localhost:4000

Endpoints (in-memory demo)
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
- Create frontend/.env.local with:
  NEXT_PUBLIC_API_URL=http://localhost:4000

Notes
- This backend stores data in memory for now. Replace src/store/db.js with a real DB (Mongo/Postgres) when ready.
- CORS allows http://localhost:3000 by default. Change CORS_ORIGIN in backend/.env if needed.
