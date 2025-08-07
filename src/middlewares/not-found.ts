import type { NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";

const notFound: NotFoundHandler = (c) => {
	throw new HTTPException(404, {
		message: `Route not Found - ${c.req.path}`,
	});
};

export default notFound;
