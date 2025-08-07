import { Hono } from 'hono';
import { viewInfo, viewItem } from '../types/Game';

const app = new Hono().basePath('/platform/public/namespaces/splitgate/views');

app.get('/', async (c) => {
  const { default: data } = await import('../../assets/json/views.json') as { default: viewInfo[] };
  const views = data.map((v) => {
    const date = new Date();
    date.setHours(date.getHours() - 2);
    v['createdAt'] = date.toISOString();
    v['updatedAt'] = date.toISOString();
    return v;
  });

  return c.json(views, 200);
});

app.get('/:id/sections', async (c) => {
  const { id } = c.req.param();
  const { default: data } = await import(`../../assets/json/views/${id}.json`);
  
  const date = new Date();
  date.setHours(date.getHours() - 2);

  const view = {
    ...data,
    items: data.items.map((i: viewItem) => {
      i['updatedAt'] = date.toISOString();
      i['createdAt'] = date.toISOString();
      return i;
    }),
    startDate: date.toISOString(),
    endDate: date.toISOString(),
    updatedAt: date.toISOString(),
    createdAt: date.toISOString(),
    viewId: id
  };

  return c.json([{
    viewId: id,
    ...view
  }], 200);
});

export default app;
