import Route from "../core/Route";
import { Request, Response, Router } from "express";
import servers from "../assets/json/servers.json";
import { server } from "../typings/Game";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const data: server[] = [];
    servers.forEach((server) => {
        data.push({
            last_update: new Date().toISOString(),
            ...server
        });
    });

    return res.status(200).json({
        servers: data,
    });
});

export default new Route({
    url: '/qosm/public/qos',
    router,
})