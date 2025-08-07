import type { WebSocketEvent } from "@/types/WS";

const onError: WebSocketEvent<"onError"> = (e) => {
	console.error(e);
	console.log("[WSS]", "error ❌");
};

export default onError;
