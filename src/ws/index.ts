
import { createBunWebSocket } from 'hono/bun'
import type { ServerWebSocket } from 'bun'

export const { upgradeWebSocket, websocket } =
  createBunWebSocket<ServerWebSocket>()