import Route from "../core/Route";
import { Request, Response, Router } from "express";
import { viewInfo, viewItem } from "../types/Game";

const router = Router();

router.get(`/`, async (req: Request, res: Response) => {
    const { default: data } = await import('../assets/json/views.json') as { default: viewInfo[] };
    const views = data.map((v) => {
        const date = new Date();
        date.setHours(date.getHours() - 2);
        v['createdAt'] = date.toISOString();
        v['updatedAt'] = date.toISOString();
        return v;
    });

    return res.status(200).json(views);
});

router.get(`/:id/sections`, async (req: Request, res: Response) => {
    const { default: data } = await import(`../assets/json/views/${req.params.id}.json`);
    
    const date = new Date();
    date.setHours(date.getHours() - 2);

    const view = {
        ...data,
        items: data.items.map((i: viewItem) => {
            i['updatedAt'] = date.toISOString();
            i['createdAt'] = date.toISOString();
            return i;
        }),
        startDate: date.toISOString(),
        endDate: date.toISOString(),
        updatedAt: date.toISOString(),
        createdAt: date.toISOString(),
        viewId: req.params.id
    }
    return res.status(200).json([
        {
            viewId: req.params.id,
            ...view
        }
    ]);
});

export default new Route({
    url: `/platform/public/namespaces/splitgate/views`,
    router,
})