# Commands

1. `bun install` at first
2. `bun sst:dev` for dev server (`development` stage)
3. `bun sst:deploy` to deploy (`production` stage)

# SST

There's a couple dev commands

- `DrizzleGenerate` will generate migrations. Use it whenever db changes. Make sure you ran it before deploy
- `DrizzleMigrate` will apply migrations to your local database

# Contents

- `packages/backend` - Elysia + Drizzle
- `packages/website` - Vite + TypeScript + React + Tailwind
- `packages/schemas` - example of a common package with dummy zod schema
