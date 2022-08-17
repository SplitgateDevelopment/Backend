import { WebSocket } from "ws";
import { eventHandler } from "../../typings/WS";

export default {
    name: "close",
    handler: (server, ws: WebSocket) => {
        console.log(`[WS]`, `Connection closed 📶`);
    }
} as eventHandler