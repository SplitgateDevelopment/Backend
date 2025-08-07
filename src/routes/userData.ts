import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";
import Utils from '../core/Utils';
import { writeFileSync } from "fs";
import { join } from "path";
import cosmeticsJSON from '../assets/json/cosmetics.json';
const cosmetics = cosmeticsJSON as {[key: string]: string[]};

const router = Router();
const { drops, coins, ids } = config.userConfig;
const customizationPath = join(__dirname, '../assets/json/customization.json');
const excludedDrops: string[] = ["Badge", "Banner", "NameTag", "None"];

router.get(`/:id/drops`, (req: Request, res: Response) => {
    return res.status(200).json({
        "namespace": "splitgate",
        "userId": req.params.id,
        "count": drops || 9999999
    });
});

router.post(`/:id/drops/open`, async (req: Request, res: Response) => {
    const { default: customization} = await import(customizationPath);

    const keys = Object.keys(cosmetics).filter((key: string) => !excludedDrops.includes(key));
    let randomKey = Utils.randomArrayElement(keys);
    let randomCosmetic = Utils.randomArrayElement(cosmetics[randomKey]);

    while (customization.customizations[randomKey].includes(randomCosmetic)) {
        randomKey = Utils.randomArrayElement(keys);
        randomCosmetic = Utils.randomArrayElement(cosmetics[randomKey]);
    };

    return res.status(200).json({
        customizations: [{
            customizationType: randomKey,
            customizationValue: randomCosmetic,
        }],
        dropCount: drops || 9999999,
    });
});

router.get(`/:id/wallets/:currency`, (req: Request, res: Response) => {
    return res.status(200).json({
        "id": Utils.randomString(10),
        "namespace": "splitgate",
        "userId": req.params.id,
        "currencyCode": req.params.currency,
        "currencySymbol": req.params.currency,
        "balance": coins || 99999999,
        "earnedBalance": coins || 99999999,
        "timeLimitedBalances": [],
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "status": "ACTIVE"
    });
});

router.get(`/:id/wallets/:currency/transactions`, (req: Request, res: Response) => {
    return res.status(200).json({
        data: [{
            "namespace": "splitgate",
            "balanceSource": "REWARD",
            "userId": req.params.id,
            "currencyCode": req.params.currency,
            "ammount": coins || 99999999,
            "operator": `splitgate:${req.params.id}`,
            "walletAction": "CREDIT",
            "walletId": Utils.randomString(10),
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString(),
        }],
        paging: {},
    });
});

router.get(`/:id/customizations/chosen`, async (req: Request, res: Response) => {
    const { default: customization} = await import(customizationPath);

    return res.status(200).json({
        "userId": req.params.id,
        ...customization
    });
});

router.put(`/:id/customizations/chosen`, async (req: Request, res: Response) => {
    const { default: customization} = await import(customizationPath);
    customization.chosenCustomizations = req.body;

    await writeFileSync(customizationPath, JSON.stringify(customization, null, 2));
    return res.status(200).json({
        "userId": req.params.id,
        ...customization
    });
});

router.post(`/:id/challenges/claim-reward`, async (req: Request, res: Response) => {
    return res.status(204);
})

router.post(`/:id/fulfillment/code`, async (req: Request, res: Response) => {
    return res.status(200).json({
        namespace: 'splitgate',
        userId: req.params.id,
    });
})

router.post(`/:id/race/friends/leaderboard`, async (req: Request, res: Response) => {
    return res.status(200).json([
        {
            difficulty: req.body.difficulty,
            platform: 'STEAM',
            userId: req.body.friendIds[0] || Utils.randomString(10),
            value: Utils.randomInt(5000, 1000),
        },
        {
            difficulty: req.body.difficulty,
            platform: 'STEAM',
            userId: ids?.userId?.toString() || Utils.randomString(10),
            value: Utils.randomInt(5000, 1000),
        }
    ]);
})

router.put('/:id/iap/amazon/sync', (req: Request, res: Response) => {
    return res.status(204).end();
});

router.put('/:id/iap/twitch/sync', (req: Request, res: Response) => {
    return res.status(204).end();
});

router.put('/:id/iap/steam/sync', (req: Request, res: Response) => {
    return res.status(204).end();
});

router.put('/:id/dlc/steam/sync', (req: Request, res: Response) => {
    return res.status(204).end();
});

router.get('/:id/orders', (req: Request, res: Response) => {
    return res.json({
        data: [{
            orderNo: Utils.randomString(10),
            userId: req.params.id,
            itemId: Utils.randomString(10),
            sandbox: false,
            quantity: Utils.randomInt(1, 50),
            status: "FULFILLED",
            createdTime: new Date().toISOString(),
            chargedTime: new Date().toISOString(),
            fulfilledTime: new Date().toISOString(),
            expireTime: new Date().toISOString(),
            totalTax: 0,
            totalPrice: Utils.randomInt(0, 999),
            subtotalPrice: Utils.randomInt(0, 999),
            currency: { currencyCode: "SC", currencySymbol: "SC"},
            itemSnapshot: {
                itemId: Utils.randomString(10),
                sku: "vbucks",
                name: "V-Bucks",
                title: "V-Bucks",
                rarity: "Legendary",
                itemType: "Item",
                listable: true,
                purchasable: true,
            }
        }],
        paging: {},
    });
});

router.post('/:id/orders', (req: Request, res: Response) => {
    return res.status(200);
});

export default new Route({
    url: `/platform/public/namespaces/splitgate/users/`,
    router,
})