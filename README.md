# Joy of Risk (Target One Wave) - SaaS Trading Dashboard

A modern SaaS trading dashboard with role-based access control and comprehensive trading tools.

## Project Structure

```
JORTOW_DASHBOARD/
├── frontend/          # React + Vite frontend
├── backend/           # NestJS backend
├── README.md
└── package.json       # Root package.json for workspace management
```

## Features

- **Role-based Access Control**: Basic, Pro, Exclusive tiers
- **Modern UI**: React + TailwindCSS v4 + shadcn/ui
- **Authentication**: Supabase integration with JWT
- **Responsive Design**: Desktop and mobile optimized
- **Trading Tools**: Signals, Market Scanner, Technical Analysis, and more

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables
3. Start development servers:
   - Frontend: `npm run dev:frontend`
   - Backend: `npm run dev:backend`

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS v4, shadcn/ui
- **Backend**: NestJS, Supabase (PostgreSQL)
- **Authentication**: JWT, Supabase Auth
- **Deployment**: Ready for production deployment