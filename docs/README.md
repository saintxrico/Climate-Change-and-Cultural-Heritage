# Climate & Cultural Heritage Watch – Kenya

## Overview
This platform allows users in Kenya to report environmental issues while preserving cultural heritage knowledge.

## Features
- Reporting system for environmental issues
- Interactive map with Leaflet.js
- Community engagement (comments, likes)
- Event coordination
- Learning hub for articles

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Leaflet.js
- Backend: Node.js, Express.js, Prisma ORM
- Database: PostgreSQL
- Storage: Cloudinary
- DevOps: Docker

## Setup Instructions
1. Clone the repository
2. Set up backend: `cd backend && npm install && npx prisma migrate dev`
3. Set up frontend: `cd frontend && npm install`
4. Run Docker: `docker-compose up` in devops folder
5. Start backend: `npm start` in backend
6. Start frontend: `npm run dev` in frontend

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/reports
- GET /api/reports
- etc.

## Database Schema
See backend/prisma/schema.prisma for details.