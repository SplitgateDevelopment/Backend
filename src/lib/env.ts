import { z } from "zod";

console.log("[ENV]", "Parsing .env");

export const envSchema = z.object({
	PORT: z.coerce.number().positive().default(5005),
	NODE_ENV: z.enum(["production", "development"]).default("development"),
});

export const env = envSchema.parse(process.env);

console.log("[ENV]", "Parsed .env");
