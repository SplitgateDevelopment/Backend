import type { ServerWebSocket } from "bun";
import { createBunWebSocket } from "hono/bun";

export const { upgradeWebSocket, websocket } =
	createBunWebSocket<ServerWebSocket>();
