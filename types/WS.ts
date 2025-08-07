import Server from "../core/Server";

type eventHandler = {
    name?: string;
    handler: (server: Server, ...args: any[]) => void;
}

type wsMessage = {
    type: string;
    [key: string]: any;
}

export {
    eventHandler,
    wsMessage,
}