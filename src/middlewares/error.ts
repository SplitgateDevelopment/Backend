import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { prettifyError, $ZodError } from "zod/v4/core";
import { env } from "@/lib/env";
import type { Env } from "@/types/env";

const onError: ErrorHandler<Env> = (err, c) => {
	const isProd = env.NODE_ENV === "production";
	const stack = isProd ? undefined : err.stack;

	if (err instanceof $ZodError) {
		return c.json(
			{
				code: "400",
				message: prettifyError(err),
				stack,
			},
			400,
		);
	}

	if (err instanceof HTTPException) {
		const status = err.status !== 200 ? err.status : 500;
		return c.json(
			{
				code: status.toString(),
				message: err.message,
				stack,
			},
			status,
		);
	}

	return c.json(
		{
			code: "500",
			message: err.message ?? "Internal Server Error",
			stack,
		},
		500,
	);
};

export default onError;