import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";
import referralDataJSON from "../assets/json/referraldata.json";

const router = Router();
const { levelConfig, proConfig, referralData } = config.userConfig;
const { seasonNumber } = config.gameConfig;

router.get(`/:id/progression`, (req: Request, res: Response) => {
    return res.status(200).json({
        level: levelConfig?.number,
        currentExp: levelConfig?.currentExp,
        requiredExp: levelConfig?.requiredExp,
        proLevel: proConfig?.level,
        proTier: proConfig?.tier,
        namespace: "splitgate",
        userId: req.params.id,
    });
});

router.get(`/:id/progression/legacy`, (req: Request, res: Response) => {
    return res.status(200).json({
        "deprecatedLevel": levelConfig?.number,
        "proTier": proConfig?.tier ?? 0,
        "proLevel": proConfig?.level ?? 0,
    });
});

router.get(`/:id/referral/info`, (req: Request, res: Response) => {
    return res.status(200).json({
        "namespace": "splitgate",
        "userId": req.params.id,
        "seasonName": `season${seasonNumber}`,
        "referrerId": referralData?.referrerId ?? "PADO",
        "canBeReferred": referralData?.canBeReferred ?? true,
        "passLevel": referralData?.passLevel ?? 0,
    });
});

router.get(`/:id/referral/data`, (req: Request, res: Response) => {
    return res.status(200).json({
        "seasonName": `season${seasonNumber}`,
        ...referralDataJSON
    });
});
    
export default new Route({
    url: `/social/public/namespaces/splitgate/users/`,
    router,
})