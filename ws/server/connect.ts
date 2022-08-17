import { IncomingMessage } from "http";
import { WebSocket } from "ws";
import { eventHandler } from "../../typings/WS";

export default {
    name: "connection",
    handler: (server, ws: WebSocket, request: IncomingMessage) => {
        console.log(`[WSS]`, `connection established 🔗`);
        
        server.wsEvents.forEach(event => {
            ws.on(event.name || "", (...args) => event.handler(server, ws, ...args));
        });
    }
} as eventHandler