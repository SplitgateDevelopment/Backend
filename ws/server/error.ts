import { eventHandler } from "../../typings/WS";

export default {
    name: "error",
    handler: (server, error: Error) => {
        console.log(`[WSS]`, `error: ${error.message} ❌`);
    }
} as eventHandler