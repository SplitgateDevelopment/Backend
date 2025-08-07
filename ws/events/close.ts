import { eventHandler } from "../../types/WS";

export default {
    name: "close",
    handler: () => {
        console.log(`[WS]`, `Connection closed 📶`);
    }
} as eventHandler