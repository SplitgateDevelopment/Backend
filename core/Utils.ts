import WebSocket from "ws";
import { wsMessage } from "../typings/WS";

class Utils {
    static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    static randomString(length: number): string {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const chars = upper + lower + numbers;

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        };
        return result;
    };

    static randomArrayElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    };

    static sendWS(ws: WebSocket, data: wsMessage) {
        if (!(data instanceof Object)) throw new Error(`Data must be an object!`);

        let message = "";
        Object.keys(data)
        .forEach(key => {
            if (data[key] instanceof Object) data[key] = JSON.stringify(data[key]);
            message += `${key}: ${data[key]}\n`;
        });

        ws.send(message);
    };

    static decodeWS(data: string): wsMessage {
        const lines = data.split(`\n`);
        const result: wsMessage = {
            type: "",
        };

        lines.forEach(line => {
            const [key, value] = line.split(`: `);
            result[key] = value;
        });

        return result;
    };
};

export default Utils;