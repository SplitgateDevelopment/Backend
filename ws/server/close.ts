import { eventHandler } from "../../typings/WS";

export default {
    name: "close",
    handler: () => {
        console.log(`[WSS]`, `connection closed 💔`);
    }
} as eventHandler