import { Hono } from 'hono';
import { randomString } from '../lib/utils';

const app = new Hono().basePath('/iam/v3/public/namespaces/splitgate');

app.post('/platforms/steam/users', (c) => {
  return c.json({
    userIdPlatforms: [
      {
        userId: randomString(15),
        platformUserId: randomString(10),
        platformId: 'steam',
      },
    ],
  }, 200);
});

app.post('/users/bulk/basic', (c) => {
  return c.json({
    data: [
      {
        userId: randomString(15),
        displayName: 'Dev Friend',
        avatarUrl: `https://github.githubassets.com/images/icons/emoji/trollface.png`,
        platformUserIds: {
          steam: randomString(10),
        },
      },
    ],
  }, 200);
});

export default app;
