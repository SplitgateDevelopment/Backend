import { Hono } from 'hono';
import config from '../config';
import { randomString } from '../lib/utils';
import battlePassJSON from '@assets/json/battlePass.json';

const app = new Hono().basePath('/seasonpass/public/namespaces/splitgate');

const { battlePass } = config.userConfig;
const { seasonNumber } = config.gameConfig;

const start = battlePass?.start ?? new Date().toISOString();
const end = battlePass?.end ?? new Date().toISOString();

app.get('/seasons/current', (c) => {
  return c.json({
    title: `Season ${seasonNumber}`,
    description: 'HAHA very funny season',
    id: randomString(15),
    namespace: 'splitgate',
    name: `season${seasonNumber}`,
    start,
    end,
    tierItemId: randomString(15),
    autoClaim: false,
    passCodes: ['premiumrewards', 'freerewards'],
    status: 'PUBLISHED',
    publishedAt: start,
    createdAt: start,
    updatedAt: start,
    passes: [
      {
        title: 'Free Rewards',
        description: 'Free rewards for all',
        seasonId: randomString(12),
        code: 'freerewards',
        namespace: 'splitgate',
        displayOrder: '1',
        autoEnroll: true,
        passItemId: randomString(15),
        createdAt: start,
        updatedAt: start,
      },
      {
        title: 'Premium Rewards',
        description: 'Premium rewards for all',
        seasonId: randomString(12),
        code: 'premiumrewards',
        namespace: 'splitgate',
        displayOrder: '1',
        autoEnroll: true,
        passItemId: randomString(15),
        createdAt: start,
        updatedAt: start,
      },
    ],
    ...battlePassJSON,
  }, 200);
});

app.get('/users/:id/seasons/current/data', (c) => {
  const { id } = c.req.param();
  return c.json({
    id: randomString(15),
    namespace: 'splitgate',
    userId: id,
    seasonId: randomString(10),
    enrolledAt: start,
    enrolledPasses: ['freerewards', 'premiumrewards'],
    currentTierIndex: battlePass?.level || 99,
    lastTierIndex: 100,
    requiredExp: 420,
    currentExp: 69,
    cleared: false,
    accumulatedXpBoost: 99,
    createdAt: start,
    updatedAt: start,
    season: {
      id: randomString(10),
      namespace: 'splitgate',
      name: `season${seasonNumber}`,
      start,
      end,
      passCodes: ['premiumrewards', 'freerewards'],
      status: 'PUBLISHED',
      publishedAt: start,
    },
    toClaimRewards: {},
    claimingRewards: {},
  }, 200);
});

export default app;
