import { eventHandler } from "../../typings/WS";

export default {
    name: "open",
    handler: () => {
        console.log(`[WS]`, `Connection opened 📶`);
    }
} as eventHandler