import { Hono } from 'hono';
import messages from '@assets/json/messages.json';

import { upgradeWebSocket } from '@/ws';
import onOpen from '@/ws/events/open';
import onClose from '@/ws/events/close';
import onError from '@/ws/events/error';
import onMessage from '@/ws/events/message';

const app = new Hono().basePath('/lobby/');

app.get('/', 
  upgradeWebSocket(() => ({
    onOpen,
    onClose,
    onError,
    onMessage,
  })))

app.get('/v1/messages', (c) => {
  return c.json(messages, 200);
});

app.get('/v1/public/player/namespaces/splitgate/users/me/blocked', (c) => {
  return c.json({ data: [] }, 200);
});

app.get('/v1/public/player/namespaces/splitgate/users/me/blocked-by', (c) => {
  return c.json({ data: [] }, 200);
});

export default app;