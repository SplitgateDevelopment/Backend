import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";
import Utils from "../core/Utils";

const router = Router();
const { ids, profile } = config.userConfig;

const profileData = {
    "userId": ids?.userId || 1,
    "namespace": "splitgate",
    "firstName": "",
    "lastName": "",
    "avatarSmallUrl": profile?.avatar || "",
    "avatarUrl": profile?.avatar || "",
    "avatarLargeUrl": profile?.avatar || "",
    "status": "ACTIVE",
    "language": "en",
    "customAttributes": {},
    "publicId": profile?.friendId || "",
    "referralId": profile?.referralId || "CIW3UN",
    "userRoles": [],
    "privateCustomAttributes": {}
};

router.get('/users/me/profiles', (req: Request, res: Response) => {
    return res.status(200).json(profileData);
});

router.put('/users/me/profiles', (req: Request, res: Response) => {
    return res.status(200).json(profileData);
});

router.get('/profiles/public', (req: Request, res: Response) => {
    return res.status(200).json([{
        "userId": Utils.randomString(10),
        "namespace":"splitgate",
        "timeZone":`+0${Utils.randomInt(0, 9)}:00`,
        "avatarSmallUrl": profile?.avatar || "",
        "avatarUrl": profile?.avatar || "",
        "avatarLargeUrl": profile?.avatar || "",
        "publicId": Utils.randomString(8),
    }]);
});

export default new Route({
    url: '/basic/v1/public/namespaces/splitgate/',
    router,
})