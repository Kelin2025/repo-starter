# Commands

1. `bun install` at first
2. `bun sst:dev` for dev server (`development` stage)
3. `bun sst:deploy` to deploy (`production` stage)

# SST

There's a couple dev commands

- `DrizzleGenerate` will initialize Drizzle. Use it once after project setup
- `DrizzleMigrate` will apply migrations to your database. Use it whenever db changes

# Contents

- `packages/backend` - Elysia + Drizzle
- `packages/website` - Vite + TypeScript + React + Tailwind
- `packages/schemas` - example of a common package with dummy zod schema
