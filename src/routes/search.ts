import Route from "../core/Route";
import { Request, Response, Router } from "express";
import Utils from '../core/Utils';

const router = Router();

router.post('/platforms/steam/users', (req: Request, res: Response) => {
    return res.status(200).json({
        "userIdPlatforms":
        [
            {
                "userId": Utils.randomString(15),
                "platformUserId": Utils.randomString(10),
                "platformId": "steam"
            }
        ]
    });
});

router.post('/users/bulk/basic', (req: Request, res: Response) => {
    //const hostname = req.headers.host;
    return res.status(200).json({
        "data":
        [
            {
                "userId": Utils.randomString(15),
                "displayName": "Dev Friend",
                "avatarUrl": `https://github.githubassets.com/images/icons/emoji/trollface.png`,
                "platformUserIds":
                {
                    "steam": Utils.randomString(10)
                }
            }
        ]
    });
});

export default new Route({
    url: '/iam/v3/public/namespaces/splitgate',
    router,
})