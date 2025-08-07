import { access, constants } from "fs";
import { createInterface } from "readline";

export const ask = (question: string): Promise<string> => {
	return new Promise((resolve) => {
		const rl = createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question(question, (answer: string) => {
			rl.close();
			resolve(answer);
		});
	});
};

export const exists = (path: string): Promise<boolean> => {
	return new Promise((resolve) => {
		access(path, constants.F_OK, (err) => resolve(!err));
	});
};

export const LogType = {
	ERROR: 0,
	SUCCESS: 1,
	INFO: 2,
	DEBUG: 3,
} as const;

type LogTypeKey = keyof typeof LogType;
type LogTypeValue = (typeof LogType)[LogTypeKey];

export function log(msg: string, type: LogTypeValue = LogType.INFO): void {
	if (!msg) return;

	const symbols: Record<LogTypeValue, string> = {
		[LogType.ERROR]: "❌",
		[LogType.SUCCESS]: "✔️",
		[LogType.INFO]: "➕",
		[LogType.DEBUG]: "ℹ️",
	};

	const symbol = symbols[type] ?? "ℹ️";
	console.log(`[${symbol}]`, msg);
}
