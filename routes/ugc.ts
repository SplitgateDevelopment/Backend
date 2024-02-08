import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";

const router = Router();

router.get('/metadata/all', (req: Request, res: Response) => {
    return res.status(200).json({
        maps_metadata: {}
    });
});

router.get('/sharecodes/:code', (req: Request, res: Response) => {
    
});

export default new Route({
    url: '/ugc/v1/public/namespaces/splitgate/maps/',
    router,
})