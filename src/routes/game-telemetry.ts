import { Hono } from 'hono'

const app = new Hono().basePath('/game-telemetry/')

app.post('/v1/protected/events', (c) => c.body(null, 204));

export default app