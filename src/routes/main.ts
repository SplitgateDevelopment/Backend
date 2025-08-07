import { Hono } from 'hono';
import config from '@/config';

const app = new Hono().basePath('/');

app.get('/', (c) => {
  return c.json({ message: 'Alive! 🛰️' }, 200);
});

app.get('/config', (c) => {
  return c.json(config, 200);
});

export default app;
