import { Hono } from "hono";
import type { BunWebSocketData } from "hono/bun";
import { env } from "@/lib/env";
import { middlewares } from "@/middlewares";
import auth from "@/routes/auth";
import base from "@/routes/base";
import gameTelemetry from "@/routes/game-telemetry";
import items from "@/routes/items";
import leaderboard from "@/routes/leaderboard";
import lobby from "@/routes/lobby";
import main from "@/routes/main";
import parties from "@/routes/parties";
import profile from "@/routes/profile";
import publicData from "@/routes/public-data";
import qos from "@/routes/qos";
import search from "@/routes/search";
import seasonpass from "@/routes/season-pass";
import sessionManager from "@/routes/session-manager";
import socialUser from "@/routes/social-user";
import ugc from "@/routes/ugc";
import userData from "@/routes/user-data";
import views from "@/routes/views";
import onError from "./middlewares/error";
import notFound from "./middlewares/not-found";
import { websocket } from "./ws";

const app = new Hono();

app.use(...middlewares);

app.onError(onError);
app.notFound(notFound);

app.route("/", auth);
app.route("/", base);
app.route("/", gameTelemetry);
app.route("/", items);
app.route("/", leaderboard);
app.route("/", lobby);
app.route("/", main);
app.route("/", parties);
app.route("/", profile);
app.route("/", publicData);
app.route("/", qos);
app.route("/", search);
app.route("/", seasonpass);
app.route("/", sessionManager);
app.route("/", socialUser);
app.route("/", ugc);
app.route("/", userData);
app.route("/", views);

export default {
	port: env.PORT,
	reusePort: true,
	fetch: app.fetch,
	websocket,
} satisfies Bun.ServeFunctionOptions<BunWebSocketData, {}>;
