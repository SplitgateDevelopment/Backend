import { Hono } from 'hono';
import { item } from '@/types/Game';

const app = new Hono().basePath('/platform/public/namespaces/splitgate/items/');

app.get('/locale/byIds', async (c) => {
  const itemIdsParam = c.req.query('itemIds');
  if (!itemIdsParam) return c.json({}, 200);

  const itemIds = itemIdsParam.split(',');
  const items: item[] = [];

  for (const itemId of itemIds) {
    const item: item = await import(`../../assets/json/items/${itemId}.json`);
    items.push(item);
  }

  return c.json(items, 200);
});

export default app;
