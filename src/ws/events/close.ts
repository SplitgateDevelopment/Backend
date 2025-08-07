import { WebSocketEvent } from "@/types/WS";

const onClose: WebSocketEvent<'onClose'> = () => {
    console.log(`[WS]`, `Connection closed 📶`);
}

export default onClose