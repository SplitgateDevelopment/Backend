import { Router } from "express";

export interface IRoute {
	name?: string;
    url: string;
    router: Router;
    auth: boolean;
}

export type RouteOptions = {
    name?: string;
    url: string;
    router: Router;
    auth?: boolean;
}