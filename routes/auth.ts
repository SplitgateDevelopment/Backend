import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";
const { username, ids, roleId } = config.userConfig;

const router = Router();
const loginData = {
    "access_token": 'access_token',
    "bans":[],
    "display_name": username,
    "expires_in":360000,
    "is_comply":true,
    "jflgs":0,
    "namespace":"splitgate",
    "namespace_roles":[
       {
          "roleId": roleId || 'roleId',
          "namespace":"*"
       }
    ],
    "permissions":[],
    "platform_id":"steam",
    "platform_user_id": ids?.steamId || 0,
    "refresh_expires_in":86400,
    "refresh_token": 'refresh_token',
    "roles":[
        roleId || 'roleId'
    ],
    "scope":"account commerce social publishing analytics",
    "token_type":"Bearer",
    "user_id": ids?.userId || 123,
    "xuid": ""
};

router.post('/platforms/steam/token', (req: Request, res: Response) => {
    return res.status(200).json(loginData);
});

router.post('/token', (req: Request, res: Response) => {
    return res.status(200).json(loginData);
});

export default new Route({
    url: '/iam/v3/oauth',
    router,
})