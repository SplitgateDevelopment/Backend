import type { SplitgateWSMessage } from "@/types/WS";

export const randomInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const randomString = (length: number): string => {
	const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lower = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const chars = upper + lower + numbers;

	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

export const randomArrayElement = <T>(array: T[]): T =>
	array[Math.floor(Math.random() * array.length)]!;

export const sendWS = (
	ws: Pick<WebSocket, "send">,
	data: SplitgateWSMessage,
) => {
	if (!(data instanceof Object)) throw new Error("Data must be an object!");

	let message = "";
	Object.keys(data).forEach((key) => {
		let value = data[key];
		if (value instanceof Object) value = JSON.stringify(value);
		message += `${key}: ${value}\n`;
	});

	ws.send(message);
};

export const decodeWS = (data: string): SplitgateWSMessage => {
	const lines = data.split("\n");
	const result: SplitgateWSMessage = {
		type: "",
	};

	lines.forEach((line) => {
		const [key, value] = line.split(": ");
		if (key) result[key] = value;
	});

	return result;
};
