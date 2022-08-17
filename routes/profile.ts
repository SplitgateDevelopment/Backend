import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";

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

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json(profileData);
});

router.put('/', (req: Request, res: Response) => {
    return res.status(200).json(profileData);
});

export default new Route({
    url: '/basic/v1/public/namespaces/splitgate/users/me/profiles',
    router,
})