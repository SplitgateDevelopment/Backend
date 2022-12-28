import express, { Application, NextFunction, Request, Response } from "express";
import { readdirSync } from 'fs';
import { join } from "path";
import { Config } from "../typings/Config";
import Route from "./Route";
import WebSocket from 'ws';
import { eventHandler } from "../typings/WS";
import http from 'http';

class Server {
    app: Application;
    config: Config;
    port: number;
    wss: WebSocket.Server;
    wsEvents: eventHandler[];
    server: http.Server;
    partyId: string;
    constructor(config: Config) {
        this.app = express();
        this.config = config;
        this.port = config?.port || 3000;
        this.wsEvents = [];
    };

    #set() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(express.static(join(__dirname, '..', 'assets')));
        
        console.log(`[INFO]`, `Server values setted 🔧`);
    };

    async #routes() {
        const routesPath = join(__dirname, '..', 'routes');
        const files = readdirSync(routesPath)
        .filter(file => file.endsWith('.js'));

        for (const file of files) {
            const { default: route } = await import(join(routesPath, file)) as { default: Route };
            
            const name = route?.name || file.split('.')[0];
            const { url } = route;

            this.app.use(url, route.router);

            console.log(`[ROUTE]`, `"${name}" loaded 🌐`);
        };

        console.log(`[INFO]`, `Routes loaded 🚀`);
        await this.#errors();
    };
        
    #errors() {
        this.app.use(this.#handle404);
        this.app.use(this.#handleError);
        console.log(`[INFO]`, `Errors loaded 🛑`);
    };

    #handle404(req: Request, res: Response, next: NextFunction) {
        res.status(404);
        res.format({
            json: () => {
                res.json({
                    code: '404',
                    message: 'not found',
                    error: 'not found'
                });
            },
            default: () => {
                res.send('Not found');
            }
        });
    };

    #handleError(err: Error, req: Request, res: Response, next: NextFunction) {
        res.status(500);
        res.format({
            json: () => {
                res.json({
                    code: '500',
                    message: 'internal server error',
                    error: err
                });
            },
            default: () => {
                res.send('Internal server error');
            }
        });
    };

    #loadWSSEvents() {
        const path  = 'ws/server';
        const events = readdirSync(join(__dirname, '..', path))
        .filter(file => file.endsWith('.js'));
        
        for (const event of events) {
            const { default: handler } = require(join(__dirname, '..', path, event)) as { default: eventHandler };
            this.wss.on(handler.name ?? event.split('.')[0], (...args) => handler.handler(this, ...args));
        }
    };

    #loadWSEvents() {
        const path = "ws/events";
        const events = readdirSync(join(__dirname, '..', path))
        .filter(file => file.endsWith('.js'));

        for (const event of events) {
            const { default: handler } = require(join(__dirname, '..', path, event)) as { default: eventHandler };
            this.wsEvents.push(handler);
        }
    };

    async start() {
        await this.#set();
        await this.#routes();

        this.server = http.createServer(this.app);
        this.server.listen(this.port, () => {
            console.log(`[INFO]`, `Server started on port ${this.port} 📀`);
        });

        this.wss = new WebSocket.Server({ server: this.server, path: '/lobby/' });

        await this.#loadWSSEvents();
        await this.#loadWSEvents();
    };
};

export default Server;