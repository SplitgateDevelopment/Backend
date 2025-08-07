import { Hono } from "hono";

const app = new Hono().basePath("/ugc/v1/public/namespaces/splitgate/maps");

app.get("/metadata/all", (c) => {
	return c.json(
		{
			maps_metadata: {},
		},
		200,
	);
});

app.get("/sharecodes/:code", (c) => {
	const { code } = c.req.param();
	return c.json({ message: `Sharecode: ${code}` }, 200);
});

export default app;
