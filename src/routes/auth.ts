import { Hono } from 'hono'
import config from "@/config";
const { username, ids, roleId } = config.userConfig;
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

const app = new Hono().basePath('/iam/v3')

app.post('/oauth/platforms/:platform/token',  (c) => c.json(loginData, 200));
app.post('/oauth/token',  (c) => c.json(loginData, 200));
app.post('/logout', (c) => c.body(null, 204));

export default app