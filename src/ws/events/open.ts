import { randomString, sendWS } from "@/lib/utils";
import { WebSocketEvent } from "@/types/WS";

const onOpen: WebSocketEvent<'onOpen'> = (_, ws) => {
    console.log(`[WS]`, `Connection opened 📶`);

    sendWS(ws, {
        type: "connectNotif",
        lobbySessionID: randomString(10),
    });

    sendWS(ws, {
        type: "systemComponentsStatus",
        components: JSON.stringify({"chat":true})
    });
}

export default onOpen