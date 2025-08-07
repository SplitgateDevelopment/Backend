import { Hono } from "hono";
import config from "@/config";

const app = new Hono().basePath(
	"/lobby/v1/public/party/namespaces/splitgate/parties",
);
const { ids } = config.userConfig;

let attributes: any = {};

app.get("/:id", (c) => {
	const id = c.req.param("id");

	return c.json({
		partyId: id,
		namespace: "splitgate",
		leader: ids?.userId?.toString() || "",
		members: [ids?.userId?.toString() || ""],
		invitees: [],
		custom_attribute: attributes,
		updatedAt: Date.now(),
	});
});

app.put("/:id/attributes", async (c) => {
	const id = c.req.param("id");
	const body = await c.req.json();

	attributes = body.custom_attribute;

	return c.json({
		partyId: id,
		namespace: "splitgate",
		leader: ids?.userId?.toString() || "",
		members: [ids?.userId?.toString() || ""],
		invitees: [],
		custom_attribute: attributes,
		updatedAt: body.updatedAt,
	});
});

export default app;
