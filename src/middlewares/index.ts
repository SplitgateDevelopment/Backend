import type { MiddlewareHandler } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { trimTrailingSlash } from "hono/trailing-slash";
import { etag } from 'hono/etag'
import { languageDetector } from 'hono/language'
import { prettyJSON } from 'hono/pretty-json'
import { timeout } from 'hono/timeout'

import { env } from "@/lib/env";

export const middlewares = [
    trimTrailingSlash(),
    secureHeaders(),
    etag(),
    languageDetector({
        supportedLanguages: ['en'],
        fallbackLanguage: 'en',
    }),
    prettyJSON(),
    timeout(4000),
] satisfies MiddlewareHandler[];

if (env.NODE_ENV === "development") {
    middlewares.push(logger());
}