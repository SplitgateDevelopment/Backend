import Route from "../core/Route";
import { Request, Response, Router } from "express";
import messages from '../assets/json/messages.json';

const router = Router();

router.get('/v1/messages', (req: Request, res: Response) => {
    return res.status(200).json(messages);
});

router.get('/v1/public/player/namespaces/splitgate/users/me/blocked', (req: Request, res: Response) => {
    return res.status(200).json({
        data: [],
    });
});

router.get('/v1/public/player/namespaces/splitgate/users/me/blocked-by', (req: Request, res: Response) => {
    return res.status(200).json({
        data: [],
    });
});

export default new Route({
    url: '/lobby',
    router,
})