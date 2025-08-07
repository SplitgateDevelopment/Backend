import Route from "../core/Route";
import { Request, Response, Router } from "express";
import Utils from "../core/Utils";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json([{
        "compositeUserId":
        {
            "userId": Utils.randomString(10),
            "platform": "STEAM",
            "platformId": Utils.randomString(10),
        },
        "value": Utils.randomInt(1, 9999),
        "displayName": "SplitgateDevelopment"
    }]);
});

export default new Route({
    url: '/social/public/namespaces/splitgate/leaderboard',
    router,
})