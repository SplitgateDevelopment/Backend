import Route from "../core/Route";
import { Request, Response, Router } from "express";
import { item } from "../types/Game";

const router = Router();

router.get(`/locale/byIds`, async (req: Request, res: Response) => {
    const itemIds = req.query.itemIds?.toString().split(',');
    const items: item[] = [];
    
    if (!itemIds) return res.status(200).json({});
    for (const itemId of itemIds) {
        const item: item = await import(`../assets/json/items/${itemId}.json`);
        items.push(item);
    };

    return res.status(200).json(items);
});

export default new Route({
    url: `/platform/public/namespaces/splitgate/items`,
    router,
})