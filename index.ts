import Server from "./core/Server";
import config from "./config";

const server = new Server(config);
server.start();