# Start

1. `pnpm i` at first
2. `pnpm dev` for dev server
3. `pnpm start` to serve

# Contents

- `packages/backend` - vite-node + express
- `packages/website` - vite + typescript + react + tailwind
- `packages/schemas` - example of a common package with dummy zod schema

# What it does

1. `package/website` starts dev server at `localhost:5173` + proxy to `localhost:3000` for `/api/*`
2. `package/backend` starts express server at `localhost:{PORT || 3000}` that hosts API + static from `package/website/dist`

Good luck!
