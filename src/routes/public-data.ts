import badges from "@assets/json/badges.json";
import challenges from "@assets/json/challenges.json";
import playlistJSON from "@assets/json/playlist.json";
import stats from "@assets/json/stats.json";
import { Hono } from "hono";
import config from "@/config";
import type { challenge } from "@/types/Game";
import type { userChallenge } from "@/types/User";

const app = new Hono().basePath("/splitgate/public/namespaces/splitgate");
const { activeChallenges, challengesStatus, seasonNumber } = config.gameConfig;

app.get("/playlist/config", (c) => {
	return c.json(playlistJSON, 200);
});

app.get("/challenges", (c) => {
	return c.json(challenges, 200);
});

app.get("/challenges/state", (c) => {
	const date = new Date();
	date.setHours(date.getHours() + 2);

	const data: Record<string, challenge> = {};

	Object.keys(activeChallenges).forEach((key) => {
		data[key] = {
			challengeIds: activeChallenges[key],
			currentPhase: 1,
			expirationTimeMs: date.getTime(),
			isActive: true,
		};
	});

	return c.json(data, 200);
});

app.get("/stats/users/placementGamesNeeded", (c) => {
	return c.json(
		{
			RANKED_TEAM_HARDCORE: 1,
			RANKED_TEAM_TAKEDOWN: 1,
			UNRANKED: 1,
		},
		200,
	);
});

app.get("/seasons/current/name", (c) => {
	return new Response(`season${seasonNumber}`, {
		status: 200,
		headers: { "content-type": "text/plain" },
	});
});

app.get("/users/:id/race", (c) => {
	const id = c.req.param("id");
	const platform = c.req.query("platform") ?? "STEAM";

	return c.json(
		{
			bestTimes: {},
			platform,
			userId: id,
		},
		200,
	);
});

app.post("/users/:id/race", (c) => {
	return c.body(null, 204);
});

app.get("/users/:id/challenges", (c) => {
	const data: { [key: string]: userChallenge[] } = {};

	Object.keys(activeChallenges).forEach((key) => {
		data[key] = activeChallenges[key].map((challengeId) => ({
			challengeId,
			challengeStatus: challengesStatus,
			currentValue: 99,
		}));
	});

	return c.json(data, 200);
});

app.post("/users/:id/challenges/claim-reward", (c) => {
	return c.body(null, 204);
});

app.get("/badges/users", (c) => {
	const userId = c.req.query("userIds") as string;

	return c.json(
		{
			[userId]: {
				...badges,
				userId,
			},
		},
		200,
	);
});

app.get("/stats/users/account", (c) => {
	const userId = c.req.query("userIds") as string;
	stats.seasonStats[0].seasonName = `season${seasonNumber}`;

	return c.json(
		{
			[userId]: {
				...stats,
				userId,
			},
		},
		200,
	);
});

app.get("/users/:id/seasonreward", (c) => {
	return c.json(
		{
			level: 0,
			winCount: 0,
		},
		200,
	);
});

app.get("/users/:id/dailyPlayStreak", (c) => {
	const id = c.req.param("id");

	return c.json(
		{
			userId: id,
			value: 0,
			xpBoostPercentage: 0,
			previousValue: 0,
			previousValueExpiresAtMs: 0,
			hasPlayedToday: true,
		},
		200,
	);
});

app.get("/users/:id/dailyCheckIn/status", (c) => {
	const today = new Date().getDay();
	const day = today === 0 ? 7 : today;

	return c.json(
		{
			dayOfWeek: day,
			daysClaimedCount: 0,
			daysMissedCount: day - 1,
			weekExpiresAtMs: Date.now() + (7 - today * 24 * 60 * 60 * 1000),
		},
		200,
	);
});

export default app;
