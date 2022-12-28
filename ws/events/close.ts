import { eventHandler } from "../../typings/WS";

export default {
    name: "close",
    handler: () => {
        console.log(`[WS]`, `Connection closed 📶`);
    }
} as eventHandler