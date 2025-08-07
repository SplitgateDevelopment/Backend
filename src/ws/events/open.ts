import { eventHandler } from "../../types/WS";

export default {
    name: "open",
    handler: () => {
        console.log(`[WS]`, `Connection opened 📶`);
    }
} as eventHandler