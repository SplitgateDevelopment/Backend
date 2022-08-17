import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";
import Utils from '../core/Utils';
import battlePassJSON from '../assets/json/battlePass.json';

const router = Router();
const { battlePass } = config.userConfig;
const { seasonNumber } = config.gameConfig;

const start = battlePass?.start ?? new Date().toISOString();
const end = battlePass?.end ?? new Date().toISOString();

router.get('/seasons/current', (req: Request, res: Response) => {
    return res.status(200).json({
        "title": `Season ${seasonNumber}`,
        "description": "HAHA very funny season",
        "id": Utils.randomString(15),
        "namespace": "splitgate",
        "name": `season${seasonNumber}`,
        "start": start,
        "end": end,
        "tierItemId": Utils.randomString(15),
        "autoClaim": false,
        "passCodes":
        [
            "premiumrewards",
            "freerewards"
        ],
        "status": "PUBLISHED",
        "publishedAt": start,
        "createdAt": start,
        "updatedAt": start,
        "passes":
        [
            {
                "title": "Free Rewards",
                "description": "Free rewards for all",
                "seasonId": Utils.randomString(12),
                "code": "freerewards",
                "namespace": "splitgate",
                "displayOrder": "1",
                "autoEnroll": true,
                "passItemId": Utils.randomString(15),
                "createdAt": start,
                "updatedAt": start
            },
            {
                "title": "Premium Rewards",
                "description": "Premium rewards for all",
                "seasonId": Utils.randomString(12),
                "code": "premiumrewards",
                "namespace": "splitgate",
                "displayOrder": "1",
                "autoEnroll": true,
                "passItemId": Utils.randomString(15),
                "createdAt": start,
                "updatedAt": start
            }
        ],
        ...battlePassJSON
    });
});

router.get('/users/:id/seasons/current/data', (req: Request, res: Response) => {

    return res.status(200).json({
        "id": Utils.randomString(15),
        "namespace": "splitgate",
        "userId": req.params.id,
        "seasonId": Utils.randomString(10),
        "enrolledAt": start,
        "enrolledPasses":
        [
            "freerewards",
            "premiumrewards",
        ],
        "currentTierIndex": battlePass?.level || 99,
        "lastTierIndex": 100,
        "requiredExp": 420,
        "currentExp": 69,
        "cleared": false,
        "accumulatedXpBoost": 99,
        "createdAt": start,
        "updatedAt": start,
        "season":
        {
            "id": Utils.randomString(10),
            "namespace": "splitgate",
            "name": `season${seasonNumber}`,
            "start": start,
            "end": end,
            "passCodes":
            [
                "premiumrewards",
                "freerewards"
            ],
            "status": "PUBLISHED",
            "publishedAt": start
        },
        "toClaimRewards": {},
        "claimingRewards": {}
    });
});

export default new Route({
    url: '/seasonpass/public/namespaces/splitgate/',
    router,
})