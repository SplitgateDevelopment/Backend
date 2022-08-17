import Route from "../core/Route";
import { Request, Response, Router } from "express";
import config from "../config";

const router = Router();
const { ids } = config.userConfig;

let attributes = {};

router.get('/:id', (req: Request, res: Response) => {
    return res.status(200).json({
        partyId: req.params.id,
        namespace: 'splitgate',
        leader: ids?.userId?.toString() || '',
        members: [ids?.userId?.toString() || ''],
        invitees: [],
        custom_attribute: attributes,
        updatedAt: new Date().getTime(),
    });
});

router.put('/:id/attributes', (req: Request, res: Response) => {
    attributes = req.body.custom_attribute;

    return res.status(200).json({
        partyId: req.params.id,
        namespace: 'splitgate',
        leader: ids?.userId?.toString() || '',
        members: [ids?.userId?.toString() || ''],
        invitees: [],
        custom_attribute: attributes,
        updatedAt: req.body.updatedAt,
    });
});

export default new Route({
    url: '/lobby/v1/public/party/namespaces/splitgate/parties/',
    router,
})