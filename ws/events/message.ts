import { WebSocket } from "ws";
import { eventHandler } from "../../typings/WS";

export default {
    name: "message",
    handler: (server, ws: WebSocket, data: Buffer|ArrayBuffer|Buffer[], isBinary: boolean) => {
        console.log(`[WS]`, `Message received 📬`);
        ws.send('{}');
    }
} as eventHandler