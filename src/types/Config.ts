import { GameData } from "./Game";
import { UserData } from "./User";

interface Config {
    port?: number;
    userConfig: UserData;
    gameConfig: GameData;
}

export {
    Config
}