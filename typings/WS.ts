import Server from "../core/Server";

type eventHandler = {
    name?: string;
    handler: (server: Server, ...args: any[]) => void;
}

export {
    eventHandler
}