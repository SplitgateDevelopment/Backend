import { Router } from 'express';
import { IRoute, RouteOptions } from '../typings/Route';

class Route implements IRoute {
    name?: string;
    url: string;
    router: Router;
    constructor(options: RouteOptions) {
        this.name = options.name;
        this.url = options.url;
        this.router = options.router;
    }
}

export default Route;