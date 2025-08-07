import { eventHandler } from "../../types/WS";

export default {
    name: "error",
    handler: (server, error: Error) => {
        console.log(`[WSS]`, `error: ${error.message} ❌`);
    }
} as eventHandler