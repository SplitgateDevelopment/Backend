import { WSEvents } from "hono/ws";

export type WebSocketEvent<E extends keyof WSEvents> = NonNullable<WSEvents<Bun.ServerWebSocket<undefined>>[E]>;

export interface SplitgateWSMessage extends Record<string, any> {
    type: string;
}