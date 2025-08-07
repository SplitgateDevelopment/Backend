import servers from "@assets/json/servers.json";
import { Hono } from "hono";
import type { server } from "@/types/Game";

const app = new Hono().basePath("/qosm/public/qos");

app.get("/", (c) => {
	const data: server[] = servers.map((s) => ({
		last_update: new Date().toISOString(),
		...s,
	}));

	return c.json({ servers: data }, 200);
});

export default app;
