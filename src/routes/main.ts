import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Alive! 🛰️'
    });
});

router.get('/config', (req: Request, res: Response) => {
    return res.json(config || {});
});

export default new Route({
    url: '/',
    router,
})