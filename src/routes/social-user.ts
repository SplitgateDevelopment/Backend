import { Hono } from 'hono';
import config from '@/config';
import referralDataJSON from '@assets/json/referraldata.json';

const app = new Hono().basePath('/social/public/namespaces/splitgate/users');

const { levelConfig, proConfig, referralData } = config.userConfig;
const { seasonNumber } = config.gameConfig;

app.get('/:id/progression', (c) => {
  const { id } = c.req.param();
  return c.json({
    level: levelConfig?.number,
    currentExp: levelConfig?.currentExp,
    requiredExp: levelConfig?.requiredExp,
    proLevel: proConfig?.level,
    proTier: proConfig?.tier,
    namespace: 'splitgate',
    userId: id,
  }, 200);
});

app.get('/:id/progression/legacy', (c) => {
  return c.json({
    deprecatedLevel: levelConfig?.number,
    proTier: proConfig?.tier ?? 0,
    proLevel: proConfig?.level ?? 0,
  }, 200);
});

app.get('/:id/referral/info', (c) => {
  const { id } = c.req.param();
  return c.json({
    namespace: 'splitgate',
    userId: id,
    seasonName: `season${seasonNumber}`,
    referrerId: referralData?.referrerId ?? 'PADO',
    canBeReferred: referralData?.canBeReferred ?? true,
    passLevel: referralData?.passLevel ?? 0,
  }, 200);
});

app.get('/:id/referral/data', (c) => {
  return c.json({
    seasonName: `season${seasonNumber}`,
    ...referralDataJSON,
  }, 200);
});

export default app;
