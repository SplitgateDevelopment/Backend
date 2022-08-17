import { WebSocket } from "ws";
import { eventHandler } from "../../typings/WS";

export default {
    name: "open",
    handler: (server, ws: WebSocket) => {
        console.log(`[WS]`, `Connection opened 📶`);
    }
} as eventHandler