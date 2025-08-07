import { randomInt, randomString } from '@/lib/utils';
import { Hono } from 'hono';

const app = new Hono().basePath('/social/public/namespaces/splitgate/leaderboard');

app.get('/', (c) => {
  const response = [{
    compositeUserId: {
      userId: randomString(10),
      platform: 'STEAM',
      platformId: randomString(10),
    },
    value: randomInt(1, 9999),
    displayName: 'SplitgateDevelopment',
  }];

  return c.json(response, 200);
});

export default app;
