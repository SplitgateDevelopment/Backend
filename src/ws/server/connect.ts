import { IncomingMessage } from "http";
import { WebSocket } from "ws";
import Utils from "../../core/Utils";
import { eventHandler } from "../../types/WS";

export default {
    name: "connection",
    handler: (server, ws: WebSocket, request: IncomingMessage) => {
        console.log(`[WSS]`, `connection established 🔗`);
        
        server.wsEvents.forEach(event => {
            ws.on(event.name || "", (...args) => event.handler(server, ws, ...args));
        });

        Utils.sendWS(ws, {
            type: "connectNotif",
            lobbySessionID: Utils.randomString(10),
        });

        Utils.sendWS(ws, {
            type: "systemComponentsStatus",
            components: JSON.stringify({"chat":true})
        });
    }
} as eventHandler