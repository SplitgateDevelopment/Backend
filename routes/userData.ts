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

router.get(`/:id/drops`, (req: Request, res: Response) => {
    return res.status(200).json({
        "namespace": "splitgate",
        "userId": req.params.id,
        "count": drops || 9999999
    });
});

router.post(`/:id/drops/open`, async (req: Request, res: Response) => {
    const { default: customization} = await import(customizationPath);

    const keys = Object.keys(cosmetics);
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

router.get(`/:id/wallets/SC`, (req: Request, res: Response) => {
    return res.status(200).json({
        "id": Utils.randomString(10),
        "namespace": "splitgate",
        "userId": req.params.id,
        "currencyCode": "SC",
        "currencySymbol": "SC",
        "balance": coins || 99999999,
        "earnedBalance": coins || 99999999,
        "timeLimitedBalances": [],
        "createdAt": new Date().toISOString(),
        "updatedAt": new Date().toISOString(),
        "status": "ACTIVE"
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

router.put('/:id/iap/amazon/sync', async (req: Request, res: Response) => {
    return res.status(204);
});

router.put('/:id/iap/steam/sync', async (req: Request, res: Response) => {
    return res.status(204);
});

router.put('/:id/dlc/steam/sync', async (req: Request, res: Response) => {
    return res.status(204);
});

export default new Route({
    url: `/platform/public/namespaces/splitgate/users/`,
    router,
})