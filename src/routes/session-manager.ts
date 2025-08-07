import { Hono } from "hono";
import config from "../config";
import { randomString } from "../lib/utils";

const app = new Hono().basePath("/sessionmanager/namespaces/splitgate");

const { ids } = config.userConfig;

app.get("/recentplayer", (c) => {
	return c.json(
		{
			data: [
				{
					namespace: "splitgate",
					user_id: ids?.userId?.toString() || "",
					other_id: randomString(10),
					other_display_name: "SplitgateDevelopment",
				},
			],
		},
		200,
	);
});

app.get("/users/:id/sessions", (c) => {
	return c.json(
		{
			errorCode: 79040,
			errorMessage: "unable to get session data",
			name: "GetSessionUnableGetData",
			message: "unable to get session data",
			attributes: {},
		},
		200,
	);
});

export default app;
