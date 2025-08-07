import { eventHandler } from "../../types/WS";

export default {
    name: "close",
    handler: () => {
        console.log(`[WSS]`, `connection closed 💔`);
    }
} as eventHandler