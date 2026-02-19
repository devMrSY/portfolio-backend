# Portfolio Backend (Express + Vercel)

Short API service for the portfolio todo list.

## Local dev

```bash
npm install
npm run dev
```

Default base URL: `http://localhost:3001`

## Production

### Vercel

Deploy normally. Vercel uses `api/index.js` with `vercel.json` routing all requests.

### Self-hosted

```bash
npm install --omit=dev
npm start
```

Runs `node api/index.js` on `PORT` (default 3001).

## Endpoints

- `GET /health`
- `GET /todos`
- `GET /todos/archived`
- `POST /todos`
- `PATCH /todos/:id`
- `PATCH /todos/:id/archive`

## Vercel

This project uses `api/index.js` as the serverless entrypoint with `vercel.json` routing all requests there.

## Env

- `PORT` (local only)
- `MONGO_URI` (if required by your DB config)
