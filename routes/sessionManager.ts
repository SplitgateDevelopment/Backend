import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";
import Utils from "../core/Utils";

const router = Router();
const { ids } = config.userConfig;

router.get('/recentplayer/', (req: Request, res: Response) => {
    return res.status(200).json({
        data: [
            {
                "namespace": "splitgate",
                "user_id": ids?.userId?.toString() || '',
                "other_id": Utils.randomString(10),
                "other_display_name": "SplitgateDevelopment"             
            },
        ]
    });
});

router.get('/users/:id/sessions', (req: Request, res: Response) => {
    res.json({
        "errorCode": 79040,
        "errorMessage": "unable to get session data",
        "name": "GetSessionUnableGetData",
        "message": "unable to get session data",
        "attributes": {}
    })
});

export default new Route({
    url: '/sessionmanager/namespaces/splitgate/',
    router,
})