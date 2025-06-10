# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Bun monorepo containing a full-stack TypeScript application with three packages:
- `@mono/backend` - Elysia API server with Drizzle ORM
- `@mono/website` - React + Vite frontend  
- `@mono/schemas` - Shared Zod schemas for type validation

The project uses SST v3 for AWS deployment with PostgreSQL (RDS) and Lambda functions.

## Essential Commands

### Development
```bash
# Install dependencies
bun i

# Run both frontend and backend
bun dev

# Run specific package
bun run --filter "./packages/website" dev
bun run --filter "./packages/backend" dev
```

### Building
```bash
# Build frontend for production
bun run --filter "./packages/website" build

# Type check frontend
bun run --filter "./packages/website" tsc -b
```

### Linting
```bash
# Lint frontend code
bun run --filter "./packages/website" lint
```

### SST/Database Commands
```bash
# Start SST dev environment
bunx sst dev

# Run database migrations
bunx sst shell bun src/migrate.ts

# Generate migration files
bunx sst shell bunx drizzle-kit generate

# Open Drizzle Studio
bunx sst shell bunx drizzle-kit studio
```

## Architecture

### Frontend (`packages/website`)
- **Stack**: React 18 + TypeScript + Vite + Tailwind CSS
- **State Management**: Effector stores + Atomic Router for routing
- **Styling**: Tailwind CSS with class-variance-authority (CVA) for component variants
- **Dev Server**: Runs on `http://localhost:5173`
- **API Proxy**: `/api/*` requests proxy to backend on port 3000

### Backend (`packages/backend`)
- **Stack**: Elysia + TypeScript (executed via Bun)
- **API**: Runs on `http://localhost:3000`
- **Database**: PostgreSQL with Drizzle ORM
- **Runtime**: Bun for development, Node.js for Lambda deployment
- **Handler**: Exports Lambda-compatible handler for AWS deployment

### Shared (`packages/schemas`)
- Contains Zod schemas for type-safe validation across frontend/backend
- No build process - pure TypeScript package

### Infrastructure (`sst.config.ts`)
- **Deployment**: AWS Lambda for API, static hosting for frontend
- **Database**: PostgreSQL RDS with Drizzle ORM migrations
- **VPC**: Configured for secure database access
- **Local Dev**: Uses Docker PostgreSQL container

## Key Development Notes

1. **Package Manager**: Uses Bun for fast package management and script execution
2. **Monorepo Dependencies**: Internal packages use `workspace:*` protocol
3. **Database**: Drizzle ORM with PostgreSQL - schema defined in `packages/backend/src/db/schema.ts`
4. **No Test Framework**: Test scripts are placeholders - choose and configure testing framework as needed
5. **Frontend Proxy**: Vite config proxies API calls to backend during development
6. **Type Safety**: Shared schemas ensure type safety across frontend/backend boundary
7. **Backend Framework**: Elysia provides fast, type-safe API development
8. **Deployment**: Lambda handler automatically adapts Elysia app for AWS deployment