import { Hono } from 'hono';
import { writeFileSync } from 'fs';
import { join } from 'path';
import config from '../config';
import { randomString, randomInt, randomArrayElement } from '../lib/utils';
import cosmetics from '@assets/json/cosmetics.json';

const app = new Hono().basePath('/platform/public/namespaces/splitgate/users');

const { drops, coins, ids } = config.userConfig;
const customizationPath = join(process.cwd(), './assets/json/customization.json');
const excludedDrops: string[] = ['Badge', 'Banner', 'NameTag', 'None'];

app.get('/:id/drops', (c) => {
  const { id } = c.req.param();
  return c.json({
    namespace: 'splitgate',
    userId: id,
    count: drops || 9999999,
  }, 200);
});

app.post('/:id/drops/open', async (c) => {
  const { default: customization } = await import(customizationPath);

  const keys = Object.keys(cosmetics).filter((key) => !excludedDrops.includes(key)) as (keyof typeof cosmetics)[];
  let randomKey = randomArrayElement(keys) as keyof typeof cosmetics;
  let randomCosmetic = randomArrayElement(cosmetics[randomKey]);

  while (customization.customizations[randomKey].includes(randomCosmetic)) {
    randomKey = randomArrayElement(keys) as keyof typeof cosmetics;
    randomCosmetic = randomArrayElement(cosmetics[randomKey]);
  }

  return c.json({
    customizations: [
      {
        customizationType: randomKey,
        customizationValue: randomCosmetic,
      },
    ],
    dropCount: drops || 9999999,
  }, 200);
});

app.get('/:id/wallets/:currency', (c) => {
  const { id, currency } = c.req.param();
  return c.json({
    id: randomString(10),
    namespace: 'splitgate',
    userId: id,
    currencyCode: currency,
    currencySymbol: currency,
    balance: coins || 99999999,
    earnedBalance: coins || 99999999,
    timeLimitedBalances: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'ACTIVE',
  }, 200);
});

app.get('/:id/wallets/:currency/transactions', (c) => {
  const { id, currency } = c.req.param();
  return c.json({
    data: [
      {
        namespace: 'splitgate',
        balanceSource: 'REWARD',
        userId: id,
        currencyCode: currency,
        amount: coins || 99999999,
        operator: `splitgate:${id}`,
        walletAction: 'CREDIT',
        walletId: randomString(10),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    paging: {},
  }, 200);
});

app.get('/:id/customizations/chosen', async (c) => {
  const { id } = c.req.param();
  const { default: customization } = await import(customizationPath);
  return c.json({
    userId: id,
    ...customization,
  }, 200);
});

app.put('/:id/customizations/chosen', async (c) => {
  const { id } = c.req.param();
  const { default: customization } = await import(customizationPath);
  customization.chosenCustomizations = await c.req.json();

  await writeFileSync(customizationPath, JSON.stringify(customization, null, 2));
  return c.json({
    userId: id,
    ...customization,
  }, 200);
});

app.post('/:id/challenges/claim-reward', (c) => {
  return c.body(null, 204);
});

app.post('/:id/fulfillment/code', (c) => {
  const { id } = c.req.param();
  return c.json({
    namespace: 'splitgate',
    userId: id,
  }, 200);
});

app.post('/:id/race/friends/leaderboard', async (c) => {
    const body = await c.req.json()
  return c.json(
    [
      {
        difficulty: body.difficulty,
        platform: 'STEAM',
        userId: body.friendIds[0] || randomString(10),
        value: randomInt(5000, 1000),
      },
      {
        difficulty: body.difficulty,
        platform: 'STEAM',
        userId: ids?.userId?.toString() || randomString(10),
        value: randomInt(5000, 1000),
      },
    ],
    200
  );
});

app.put('/:id/iap/amazon/sync', (c) => {
  return c.body(null, 204);
});

app.put('/:id/iap/twitch/sync', (c) => {
  return c.body(null, 204);
});

app.put('/:id/iap/steam/sync', (c) => {
  return c.body(null, 204);
});

app.put('/:id/dlc/steam/sync', (c) => {
  return c.body(null, 204);
});

app.get('/:id/orders', (c) => {
  const { id } = c.req.param();
  return c.json({
    data: [
      {
        orderNo: randomString(10),
        userId: id,
        itemId: randomString(10),
        sandbox: false,
        quantity: randomInt(1, 50),
        status: 'FULFILLED',
        createdTime: new Date().toISOString(),
        chargedTime: new Date().toISOString(),
        fulfilledTime: new Date().toISOString(),
        expireTime: new Date().toISOString(),
        totalTax: 0,
        totalPrice: randomInt(0, 999),
        subtotalPrice: randomInt(0, 999),
        currency: { currencyCode: 'SC', currencySymbol: 'SC' },
        itemSnapshot: {
          itemId: randomString(10),
          sku: 'vbucks',
          name: 'V-Bucks',
          title: 'V-Bucks',
          rarity: 'Legendary',
          itemType: 'Item',
          listable: true,
          purchasable: true,
        },
      },
    ],
    paging: {},
  }, 200);
});

app.post('/:id/orders', (c) => {
  return c.body(null, 200);
});

export default app;
