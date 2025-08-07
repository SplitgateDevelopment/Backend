import { Hono } from "hono";
import config from "@/config";
import { randomInt, randomString } from "@/lib/utils";

const app = new Hono().basePath("/basic/v1/public/namespaces/splitgate");

const { ids, profile } = config.userConfig;

const profileData = {
	userId: ids?.userId || 1,
	namespace: "splitgate",
	firstName: "",
	lastName: "",
	avatarSmallUrl: profile?.avatar || "",
	avatarUrl: profile?.avatar || "",
	avatarLargeUrl: profile?.avatar || "",
	status: "ACTIVE",
	language: "en",
	customAttributes: {},
	publicId: profile?.friendId || "",
	referralId: profile?.referralId || "CIW3UN",
	userRoles: [],
	privateCustomAttributes: {},
};

app.get("/users/me/profiles", (c) => {
	return c.json(profileData, 200);
});

app.put("/users/me/profiles", (c) => {
	return c.json(profileData, 200);
});

app.get("/profiles/public", (c) => {
	const result = [
		{
			userId: randomString(10),
			namespace: "splitgate",
			timeZone: `+0${randomInt(0, 9)}:00`,
			avatarSmallUrl: profile?.avatar || "",
			avatarUrl: profile?.avatar || "",
			avatarLargeUrl: profile?.avatar || "",
			publicId: randomString(8),
		},
	];

	return c.json(result, 200);
});

export default app;
